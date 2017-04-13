(function () {
    angular
        .module("MovieZone")
        .config(Config);

    function Config($routeProvider) {
        $routeProvider
            .when("/managemovies",{
                templateUrl: "views/admin/templates/manage-movies.view.client.html",
                controller: "ManageMoviesController",
                controllerAs: "model",
                resolve :{
                    loggedIn: checkLoggedIn
                }
            })
            .when("/manageusers",{
                templateUrl: "views/admin/templates/manage-users.view.client.html",
                controller: "ManageUsersController",
                controllerAs: "model",
                resolve :{
                    loggedIn: checkLoggedIn
                }
            })
            .when("/manageflaggedreviews",{
                templateUrl: "views/admin/templates/manage-flaggedreviews.view.client.html",
                controller: "ManageFlaggedReviewsController",
                controllerAs: "model",
                resolve :{
                    loggedIn: checkLoggedIn
                }
            })

            .when("/adminconsole",{
                templateUrl: "views/admin/templates/admin-console.view.client.html",
                controller: "AdminConsoleController",
                controllerAs: "model",
                resolve :{
                    loggedIn: checkLoggedIn
                }
            })


            .when("/movie/:id/review",{
                templateUrl: "views/common/templates/movie-review.view.client.html",
                controller: "MovieReviewController",
                controllerAs: "model",
                resolve: {
                    loggedIn: checkLoggedIn
                }

            })

            .when("/cast/:id", {
                templateUrl: "views/common/templates/cast-info.view.client.html",
                controller: "CastController",
                controllerAs: "model"
            })


            .when("/movie/:id",{
                templateUrl: "views/common/templates/movie-info.view.client.html",
                controller: "MovieInfoController",
                controllerAs: "model",
                resolve :{
                    guestView : guestView
                }
            })

       
            .when("/moviedefault",{
                templateUrl : "views/common/templates/movie-default.view.client.html",
                controller: "movieDefaultController",
                controllerAs: "model",
                resolve : {
                    guestView: guestView
                }
            })

            .when("/user/profile/:username",{
                templateUrl : "views/user/templates/user-profile.view.client.html",
                controller: "UserProfileController",
                controllerAs: "model",
                resolve:{
                    guestView : guestView
                }
            })
            
            .when("/profile",{
                templateUrl: "views/user/templates/profile.view.client.html",
                controller : "ProfileController",
                controllerAs: "model" ,
                resolve: {
                    loggedIn: checkLoggedIn
                }
            })

            .when("/editprofile",{
                templateUrl: "views/user/templates/profile-edit.view.client.html",
                controller : "ProfileEditController",
                controllerAs: "model" ,
                resolve: {
                    loggedIn: checkLoggedIn
                }
            })
            .when("/register",{
                templateUrl: "views/user/templates/register.view.client.html",
                controller : "RegisterController",
                controllerAs: "model",
                resolve : {
                    guestView: guestView
                }
            })

            .when("/login",{
                templateUrl: "views/user/templates/login.view.client.html",
                controller: "LoginController",
                controllerAs : "model",
                resolve : {
                    guestView : guestView
                }
            })

            .when("/search/:movieName",{
                templateUrl: "views/common/templates/search.view.client.html",
                controller: "searchController",
                controllerAs: "model",
                resolve : {
                    guestView : guestView
                }
            })

            .when("/home", {
                templateUrl: "views/user/templates/home.view.client.html",
                controller: "homeController",
                controllerAs: "model"
            })
            .otherwise({
            templateUrl: "views/user/templates/home.view.client.html",
                controller: "homeController",
                controllerAs: "model"
        });

        function checkLoggedIn(UserService, $location, $q, $rootScope) {
            var deferred = $q.defer();
            UserService
                .loggedIn()
                .then(function (response) {
                    var user = response.data;
                    if(user=='0'){
                        $rootScope.currentUser = null;
                        deferred.reject();
                        $location.url("/login");
                    }else{
                        $rootScope.currentUser = user;
                        deferred.resolve();
                    }
                },function (err) {
                    $location.url("/login");
                });

            return deferred.promise;
        }

        function guestView(UserService, $location, $q, $rootScope) {
            var deferred = $q.defer();
            UserService
                .loggedIn()
                .then(
                    function (response) {
                        var user = response.data;
                        if(user == '0'){
                            deferred.resolve();
                        } else {
                            $rootScope.currentUser = user;
                            deferred.resolve();
                        }
                    },
                    function (err) {
                        $location.url("/login");
                    }
                );
            return deferred.promise;
        }
    }
})();