(function(){
    angular
        .module("MovieZone")
        .controller("ProfileEditController", ProfileEditController);

    function ProfileEditController($routeParams, $location, UserService, $rootScope) {
        var vm = this;
        vm.updateUser = updateUser;
        vm.deleteUser = deleteUser;
        vm.userId = $rootScope.currentUser._id;
        var userId = $rootScope.currentUser._id;
        vm.logout = logout;

        function init(){
            UserService
                .findUserById(userId)
                .then(function (response) {
                    vm.user = response.data;
                });
        }
        init();



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
        function deleteUser() {
            UserService
                .deleteUser(userId)
                .then(function (response) {
                    var result= response.data;
                    if(result){
                        $location.url("/login");
                    }else{
                        vm.error = "Something went wrong. Please try again later."
                    }
                });
        }

        function updateUser(user){
            UserService
                .updateUser(userId, user)
                .then(function (res) {
                    var updatedUser = res.data;
                    if (updatedUser){
                        vm.success="Successfully updated.";
                    }else{
                        vm.error = "Something went wrong. Please try again later.";
                    }
                });
        }



    }


})();