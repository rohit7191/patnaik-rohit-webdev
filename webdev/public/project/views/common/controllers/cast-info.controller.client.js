(function(){
    angular
        .module("MovieZone")
        .controller("CastController", CastController);

    function CastController(UserService, $routeParams,$rootScope, $location, TmdbApiService) {

        var vm = this;
        vm.id = $routeParams.id;
        vm.logout = logout;

        function init() {

            getLoggedInUser();
            findCastById();
        }
        return init();

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
        function getLoggedInUser() {
            if($rootScope.currentUser){
                vm.loggedIn = "true";
                loggedInUserId = $rootScope.currentUser._id;

            } else {
                vm.notloggedIn = "true";

            }
        }

        function findCastById() {
            TmdbApiService
                .findCastByID(vm.id,
                function(response){
                    response.movie_credits.cast.splice(8, response.movie_credits.cast.length-8);
                    vm.actor = response;
                })
        }
    }
})();