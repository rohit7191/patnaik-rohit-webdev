(function(){
    angular
        .module("MovieZone")
        .controller("RegisterController", RegisterController);
    function RegisterController($location, UserService) {
        var vm = this;
        vm.register = register;
        function init(){

        }
        init();

        function register(username, password, vpassword, firstName, lastName) {
            var admin = "false";

            if(vm.myform.$valid == false) {
                vm.error = "Enter the username/password";
                vm.alert = "* Enter the fields";
            }
            if(password != vpassword) {
                vm.error = "Password did not match";
            } else {
                UserService
                    .register(username, password, firstName, lastName, admin)
                    .then(
                        function (response) {
                            var user = response.data;
                            if(user) {
                                $location.url("/profile");
                            }
                        },
                        function (err) {
                            vm.error = err.data;
                        }
                    );
            }
        }

    }
    
})();