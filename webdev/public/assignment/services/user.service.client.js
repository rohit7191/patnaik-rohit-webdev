/**
 * Created by Rohit Patnaik on 2/10/2017.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("UserService", userService);

    function userService() {
        var users = [
            {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
            {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
            {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
        ];
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
            for(var u in users){
                if(users[u]._id == uid){
                    users.splice(u,1);
                    break;
                }
            }
            console.log(users);
        }

        function createUser(user){
            var newuser={};
            newuser.username = user.username;
            newuser.password = user.password;
            newuser.firstName = user.firstName;
            newuser.lastName = user.lastName;

            if(users){
                newuser._id = users[users.length - 1]._id + 1;
            }
            else{
                newuser._id = 123;
            }
            users.push(newuser);
            return newuser;
        }

        function updateUser(userId, newUser) {
            for(var u in users) {
                if( users[u]._id == userId ) {
                    users[u].firstName = newUser.firstName;
                    users[u].lastName = newUser.lastName;
                    return users[u];
                }
            }
            return null;
        }

        function findUserById(userId) {
            for(var u in users) {
                if( users[u]._id == userId ) {
                    return users[u];
                }
            }
            return null;
        }
        function findUserByName(username) {
            for(var u in users) {
                if( users[u].username == username ) {
                    return users[u];
                }
            }
            return null;
        }

        function findUserByCredentials(username, password) {
            for(var u in users) {
                if( users[u].username == username &&
                    users[u].password == password ) {
                    return users[u];
                }
            }
            return null;
        }
    }
})();