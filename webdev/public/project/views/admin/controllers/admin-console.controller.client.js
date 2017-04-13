(function () {
    angular
        .module("MovieZone")
        .controller("AdminConsoleController",AdminConsoleController);
    
    function AdminConsoleController(TmdbApiService, $rootScope, $location, $sce, UserService) {
        var vm = this;

        vm.logout=logout;

        function init() {

            getLoggedInUser();
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

      

    }
})();