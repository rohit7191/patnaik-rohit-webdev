(function(){
    angular
        .module("MovieZone")
        .controller("UserProfileController", UserProfileController);
    function UserProfileController($routeParams, $location, UserService, $rootScope) {
        var vm = this;
        var username = $routeParams.username;
        var loggedInUserId = $rootScope.currentUser._id;

        vm.logout = logout;
        vm.followUser = followUser;
        vm.unfollowUser = unfollowUser;

        function init() {
            findUserByUsername();
            getLoggedInUser();
            alreadyFollowing()
        }
        return init();



        function alreadyFollowing() {
            UserService
                .findUserById(loggedInUserId)
                .then(function (response) {
                    var userFollows = response.data.follows;
                    for (var i in userFollows) {
                        if (userFollows[i].username == username) {
                            vm.following = "true";
                            return;
                        }
                    }
                    vm.notfollowing = "true";

                });
        }



        function unfollowUser() {
            UserService
              .unfollowUser(loggedInUserId, username)
              .then(function (res) {
                  var unfollow = res.data;
                    if (unfollow){
                      vm.unfollow= "you are now unfollowing this user.";
                      
                  }else{
                      vm.error = "Something is wrong! you can't unfollow this user"
                  }
              });         
    }

        function followUser() {

            UserService
                .findUserById(loggedInUserId)
                .then(function (response) {
                    var userFollows = response.data.follows;
                    for(var i in userFollows){
                        if(userFollows[i].username == username){
                            vm.error = "You are already following this user.";
                            return;
                        }
                    }

                    UserService
                        .findUserByUsername(username)
                        .then(function (response) {
                            var returnedUser = response.data;
                            var userId = returnedUser._id;
                            var follows = {
                                userId : userId,
                                username : username
                            };

                            UserService
                                .followUser(loggedInUserId, follows)
                                .then(function (res) {
                                    var newUser = res.data;
                                    
                                    if (newUser){
                                        vm.success= "you are now following the user";

                                    }else{
                                        vm.error = "Something is wrong! you can follow this user"
                                    }
                                });
                        });

                });
        }

        

        function findUserByUsername() {
            UserService
                .findUserByUsername(username)
                .then(function (response) {
                    vm.user = response.data;

                });
        }




        function getLoggedInUser() {
            if($rootScope.currentUser){
                vm.loggedIn = "true";
                loggedInUserId = $rootScope.currentUser._id;

            } else {
                vm.notloggedIn = "true";

            }
        }


        function logout() {
            UserService
                .logout()
                .then(
                    function (response) {
                        $location.url("/home");
                    },
                    function () {
                        $location.url("/home");
                    }
                );
        }

    }


})();