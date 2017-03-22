module.exports = function (app, userModel) {
    app.get("/api/user", findUser);
    app.get("/api/user/:userId", findUserById);
    app.put("/api/user/:userId", updateUser);
    app.post("/api/user", createUser);
    app.delete("/api/user/:userId", deleteUser);

    // var users = [
    //     {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder"},
    //     {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"},
    //     {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
    //     {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi"}
    // ];

    function deleteUser(req, res) {
        var userId = req.params.userId;
        // for(var u in users) {
        //     if(users[u]._id == userId) {
        //         users.splice(u, 1);
        //         res.sendStatus(200);
        //         return;
        //     }
        // }
        // res.sendStatus(404);
        userModel
            .deleteUser(userId)
            .then(function (user) {
                res.json(user);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function updateUser(req, res) {
        var userId = req.params.userId;
        var newUser = req.body;
        // for (var u in users) {
        //     if (users[u]._id == userId) {
        //         users[u].firstName = newUser.firstName;
        //         users[u].lastName = newUser.lastName;
        //         res.json(users[u]);
        //         return;
        //     }
        // }
        // res.sendStatus(404);
        userModel
            .updateUser(userId, newUser)
            .then(function (user) {
                res.json(user);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function findUserById(req, res) {
        var userId = req.params.userId;
       // console.log("Inside user service userbyid");
       // console.log(userId);
        // var user = users.find(function (u) {
        //     return u._id == userId;
        // });
        // res.json(user);
        userModel
            .findUserById(userId)
            .then(function (user) {
                res.json(user);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function findUser(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        if (username && password) {
         //   console.log(username);
         //   console.log(password);
            findUserByCredentials(req, res);
        } else if (username) {
            findUserByUsername(req, res);
        }
    }

    function findUserByUsername(req, res) {
        // var user = users.find(function (u) {
        //     return u.username == req.query.username;
        // });
        // if (user) {
        //     res.sendStatus(404)
        // } else {
        //     res.sendStatus(200);
        // }
        var username = req.query.username;
        userModel
            .findUserByUsername(username)
            .then(function (user) {
                res.json(user);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function findUserByCredentials(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        // var user = users.find(function (user) {
        //     return user.password == password && user.username == username;
        // });
        // res.json(user);
        userModel
            .findUserByCredentials(username, password)
            .then(function (user) {
                res.json(user);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }

    function createUser(req, res) {
        var newUser = req.body;
        // user._id = (new Date()).getTime() + "";
        // users.push(user);
        // res.json(user);
        userModel
            .createUser(newUser)
            .then(function (user) {
                res.json(user);
            }, function (err) {
                res.sendStatus(500).send(err);
            });
    }
}