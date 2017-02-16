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
            validUserName = UserService.findUserByName(user.username);
            if(validUserName == null) {
                if (user.username != null && (user.password == user.cpassword)) {
                    newuser = UserService.createUser(user);
                    $location.url("/user/" + newuser._id);
                }
                else{
                    if(user.username == null) {
                        vm.error = "Username field is mandatory"
                    }
                    else {
                        vm.error = "Invalid password"
                    }
                }
            }
            else{
                vm.error = "Username already exists"
            }
        }
    }
})();