/**
 * Created by Rohit Patnaik on 2/10/2017.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("RegisterController", registerController);

    function registerController($location, UserService) {
        var vm = this;

        vm.registernewuser = registernewuser;

        function init() {
        }

        init();

        function registernewuser(user) {
            if (user) {
                UserService
                    .findUserByName(user.username)
                    .success(function () {
                        if (user.password == user.cpassword) {
                            UserService
                                .createUser(user)
                                .success(function (newuser) {
                                    if (newuser) {
                                        $location.url('/user/' + newuser._id);
                                    }
                                });
                        }
                        else {
                            vm.error = "Passwords doesn't match"
                        }
                    })
                    .error(function () {
                        vm.error = "Username is already taken"
                    });
            }
            else {
                vm.error = "Error registering the user. Try again"
            }
        }
    }
})();