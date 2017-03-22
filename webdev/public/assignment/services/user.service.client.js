/**
 * Created by Rohit Patnaik on 2/10/2017.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("UserService", userService);

    function userService($http) {
        var api = {
            "findUserByCredentials": findUserByCredentials,
            "findUserById": findUserById,
            "findUserByName": findUserByName,
            "updateUser": updateUser,
            //TODO: complete the CRUD functions
            "createUser": createUser,
            "deleteUser": deleteUser
        };
        return api;

        function deleteUser(uid){
            return $http.delete("/api/user/:userId"+ uid);
        }

        function createUser(user){
            return $http.post("/api/user",user);
        }

        function updateUser(userId, user) {
            return $http.put("/api/user/"+userId, user);
        }

        function findUserById(userId) {
                console.log("Inside client service");
                console.log(userId);
                return $http.get("/api/user/"+userId);
            }


        function findUserByName(username) {
            return $http.get("/api/user?username="+username);
        }

        function findUserByCredentials(username, password) {
            return $http.get("/api/user?username="+username+"&password="+password);
        }
    }
})();