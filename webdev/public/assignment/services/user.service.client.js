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
            // for(var u in users){
            //     if(users[u]._id == uid){
            //         users.splice(u,1);
            //         break;
            //     }
            // }
            // console.log(users);
            return $http.delete("/api/user/:userId"+ uid);
        }

        function createUser(user){
            return $http.post("/api/user",user);
            // var newuser={};
            // newuser.username = user.username;
            // newuser.password = user.password;
            // newuser.firstName = user.firstName;
            // newuser.lastName = user.lastName;
            //
            // if(users){
            //     newuser._id = users[users.length - 1]._id + 1;
            // }
            // else{
            //     newuser._id = 123;
            // }
            // users.push(newuser);
            // return newuser;
        }

        function updateUser(userId, user) {
            // for(var u in users) {
            //     if( users[u]._id == userId ) {
            //         users[u].firstName = newUser.firstName;
            //         users[u].lastName = newUser.lastName;
            //         return users[u];
            //     }
            // }
            // return null;
            return $http.put("/api/user/"+userId, user);
        }

        function findUserById(userId) {
            // for(var u in users) {
            //     if( users[u]._id == userId ) {
            //         return users[u];
            //     }
            // }
            // return null;
                return $http.get("/api/user/"+userId);
            }


        function findUserByName(username) {
            // for(var u in users) {
            //     if( users[u].username == username ) {
            //         return users[u];
            //     }
            // }
            // return null;
            return $http.get("/api/user?username="+username);
        }

        function findUserByCredentials(username, password) {

            return $http.get("/api/user?username="+username+"&password="+password);
            // for(var u in users) {
            //     if( users[u].username == username &&
            //         users[u].password == password ) {
            //         return users[u];
            //     }
            // }
            // return null;
        }
    }
})();