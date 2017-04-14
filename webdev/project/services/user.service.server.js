var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy; //added recently
var FacebookStrategy = require('passport-facebook').Strategy;
var bcrypt = require("bcrypt-nodejs");

// var googleConfig = {
//     clientID     : "392809642931-1d55q4j8c70rv3dcm2rgu3f7e3rlvjdr.apps.googleusercontent.com",
//     clientSecret : "weCeyBhz33SlyfyLKMsmI5M5",
//     callbackURL  : "https://patnaik-rohit-webdev.herokuapp.com/auth/google/callback"
// };
//
// var facebookConfig = {
//     clientID     : "272593499854861",
//     clientSecret : "eab1f680bb0ce926649ff4f016983714",
//     callbackURL  : "http://127.0.0.1:3000/auth/facebook/callback"
// };

var googleConfig = {
 clientID     : process.env.GOOGLE_CLIENT_ID,
 clientSecret : process.env.GOOGLE_CLIENT_SECRET,
 callbackURL  : process.env.GOOGLE_CALLBACK_URL
 };

var facebookConfig = {
    clientID     : process.env.FACEBOOK_CLIENT_ID,
    clientSecret : process.env.FACEBOOK_CLIENT_SECRET,
    callbackURL  : process.env.FACEBOOK_CALLBACK_URL
};

module.exports= function(app, models){
    var auth = authorized;
    var userModel = models.userModel;
    app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));
    app.get('/auth/facebook', passport.authenticate('facebook', { scope : ['email'] }));
    app.post("/api/project/register", register);
    app.get("/api/project/loggedIn",loggedIn);
    app.post("/api/project/logout", logout);
    app.post('/api/project/login', passport.authenticate('MovieZone'), login);
    app.put("/api/project/:userId/rateandreview", rateandreview);
    app.get("/api/project/user", getUsers);
    app.post("/api/project/user", createUser);
    app.get("/api/project/user/:userId", findUserById);
    app.delete("/api/project/user/:userId", deleteUser);
    app.put("/api/project/user/:userId", updateUser);
    app.put("/api/project/user/follows/:userId", followUser);
    app.put("/api/project/user/:userId/unfollows/:username", unfollowUser);
    app.get('/api/project/findallusers', findallusers);
    app.get('/auth/google/callback',
        passport.authenticate('google', {
            successRedirect: '/project/#/profile',
            failureRedirect: '/project/#/login'
        }));
    app.get('/auth/facebook/callback',
        passport.authenticate('facebook', {
            successRedirect: '/project/#/profile',
            failureRedirect: '/project/#/login'
        }));


    function authorized(req, res, next) {
        if (!req.isAuthenticated()) {
            res.sendStatus(401);
        } else {
            next();
        }
    }
  passport.use('MovieZone', new LocalStrategy(localStrategy));

    function localStrategy(username, password, done) {
        userModel
            .findUserByUsername(username)
            .then(
                function (user) {
                    if(user && bcrypt.compareSync(password, user.password)){
                        done(null,user);
                    }
                    else {
                        done(null, true);
                    }
                },
                function(err) {
                    done(err);
                });
    }

  passport.use(new GoogleStrategy(googleConfig, googleStrategy));

  function googleStrategy(token, refreshToken, profile, done) {
        userModel
            .findUserByGoogleId(profile.id)
            .then(
                function(user) {
                    if(user) {
                        return done(null, user);
                    } else {
                        var email = profile.emails[0].value;
                        var emailParts = email.split("@");
                        var newGoogleUser = {
                            username:  emailParts[0],
                            firstName: profile.name.givenName,
                            lastName:  profile.name.familyName,
                            email:     email,
                            google: {
                                id:    profile.id,
                                token: token
                            }
                        };
                        return userModel.createUser(newGoogleUser);
                    }
                },
                function(err) {
                    if (err) { return done(err); }
                }
            )
            .then(
                function(user){
                    return done(null, user);
                },
                function(err){
                    if (err) { return done(err); }
                }
            );
    }

    passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));
    function facebookStrategy(token, refreshToken, profile, done) {

        userModel
            .findUserByFacebookId(profile.id)
            .then(function (user) {
                if (user) {
                    return done(null, user);
                } else {
                    var newUser = {
                        username: profile.displayName.replace(/ /g, ""),
                        facebook: {
                            token: token,
                            id: profile.id
                        }
                    };
                    userModel
                        .createUser(newUser)
                        .then(function (user) {
                            return done(null, user);
                        }, function (err) {
                            return done(err, null);
                        });
                }
            }, function (err) {
                return done(err, null);
            });
    }

    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        userModel
            .findUserById(user._id)
            .then(
                function(user){
                    done(null, user);
                },
                function(err){
                    done(err, null);
                }
            );
    }


    function rateandreview(req, res) {

        var id = req.params.userId;
        var rateandreview = req.body;
 
        userModel
            .updateRatesandReviews(id, rateandreview)
            .then(
                function (stats) {
                    res.sendStatus(200).send(stats);
                },
                function (error) {
                    res.sendStatus(404).send(error);
                }
            );
    }

    
    function logout(req, res) {
        req.logout();
        res.sendStatus(200);
    }


    function findallusers(req, res) {

        userModel
            .findAllUsers()
            .then(
                function (users) {
                    res.json(users);
                },
                function (error) {
                    res.sendStatus(404).send(error);
                }
            );
    }
    
    
    function register(req,res) {
        var username = req.body.username;
        var password = req.body.password;
        userModel
            .findUserByUsername(username)
            .then(function (user) {
                    if(user){
                        res.status(400).send("Username is in use");
                        //return;
                    }else{
                        req.body.password = bcrypt.hashSync(req.body.password);
                        return userModel
                            .createUser(req.body);

                    }
                },
                function (err) {
                    res.sendStatus(400).send(err);

                })

            .then(
                function (user) {
                    if(user){
                        req.login(user, function (err) {
                            if(err){
                                res.sendStatus(400).send(err);
                            }else{
                                res.json(user);
                            }
                        })
                    }
                },
                function (err) {
                    res.sendStatus(400).send(err);
                });
    }



    function login ( req, res){
        var user = req.user;
        res.json(user);
    }


    function loggedIn(req,res) {
      if(req.isAuthenticated()){
            res.json(req.user);
        }else{
            res.send(null);
        }
    }

    function updateUser(req, res) {
        var id = req.params.userId;
        var user = req.body;


        userModel
            .updateUser(id, user)
            .then(
                function (stats) {
                    res.sendStatus(200);
                },
                function (error) {
                    res.sendStatus(404);
                }
            );
    }
    
    function followUser(req, res) {
        var id = req.params.userId;
        var follows = req.body;

        userModel
            .followUser(id, follows)
            .then(
                function (stats) {
                    res.sendStatus(200);
                },
                function (error) {
                    res.sendStatus(404);
                }
            );
    }

    function unfollowUser(req, res) {
        var id = req.params.userId;
        var username = req.params.username;

        userModel
            .unfollowUser(id, username)
            .then(
                function (stats) {
                    res.sendStatus(200);
                },
                function (error) {
                    res.sendStatus(404);
                }
            );
    }


    function createUser(req, res) {

        var username = req.body.username;

        userModel
            .findUserByUsername(username)
            .then(
                function (user) {
                    if(user){
                        res.send("Username already exists!");
                    } else {
                        req.body.password = bcrypt.hashSync(req.body.password);
                        return userModel
                            .createUser(req.body)
                    }
                },
                function (err) {
                    res.sendStatus(400).send(err);
                }
            )
            .then(
                function (user) {
                    if(user){
                        res.sendStatus(200);
                    }
                },
                function (err) {
                    res.sendStatus(400).send(err);
                }
            );

    }



    function deleteUser(req,res) {
        var userId = req.params.userId;

        userModel
            .deleteUser(userId)
            .then(function (stats) {
                    res.send(200);
                },
                function (error) {
                    res.statusCode(404).send(error);
                });


    }

    function findUserById(req, res){
        var id = req.params.userId;

        userModel
            .findUserById(id)
            .then(function (user) {
                    res.send(user);
                },
                function (error) {
                    res.statusCode(404).send(error);
                });

    }

    function getUsers(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        if(username && password){
            findUserByCredentials(username, password, req, res);
        } else if(username){
            findUserByUsername(username, res);
        }else {
            findAllUsers();
        }
    }

    function findUserByCredentials (username, password, req, res){
        userModel
            .findUserByCredentials(username, password)
            .then(function (user) {
                    req.session.currentUser= user;
                    res.json(user);
                },
                function (err) {
                    res.statusCode(404).send(err);
                });
    }

    function findUserByUsername(username, res) {
        userModel
            .findUserByUsername(username)
            .then(
                function (user) {
                    res.json(user);
                },
                function (error) {
                    res.sendStatus(404).send(error);
                }
            );
    }


};