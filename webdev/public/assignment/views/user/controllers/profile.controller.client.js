/**
 * Created by Rohit Patnaik on 2/14/2017.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);

    function ProfileController($routeParams, UserService) {
        var vm = this;

        // event handlers
        vm.updateUser = updateUser;
        // vm.deleteUser = deleteUsers;

        var userId = $routeParams['uid'];

        function init() {
            // var user = UserService.findUserById(userId);
            // vm.user = user;
            var promise = UserService.findUserById(userId);
            promise.success(function(user){
                vm.user = user;
            });
        }
        init();

        function updateUser() {
            // var user = UserService.updateUser(userId,vm.user);
            // if(user != null) {
            //     vm.message = "User Successfully Updated!"
            // } else {
            //     vm.error = "Unable to update user";
            // }
            UserService
                .updateUser(userId, vm.user)
                .success(function (user) {
                    if(user) {
                        vm.message = "User Successfully Updated!"
                    } else {
                        vm.error = "Unable to update user";
                    }
                });
        }
    }
})();