(function(){
    angular
        .module("MovieZone")
        .controller("ProfileController", ProfileController);

    function ProfileController($routeParams, $location, UserService, $rootScope) {
        var vm = this;

        vm.logout = logout;

        vm.userId = $rootScope.currentUser._id;
        var userId = $rootScope.currentUser._id;

        function init(){
            UserService
                .findUserById(userId)
                .then(function (response) {
                    vm.user = response.data;
                    if(vm.user.rates.length == 0){
                        vm.norates= true;
                    }
                    if(vm.user.reviews.length == 0){
                        vm.noreviews= true;
                    }
                    if(vm.user.follows.length == 0){
                        vm.nofollowers= true;
                    }
                });
        }
        init();


        if($rootScope.currentUser.admin === "true"){
            vm.admin = "true";
        }else {
            vm.nonadmin = "false";
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