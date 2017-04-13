
module.exports = function () {

    var mongoose = require ("mongoose");
    var UserSchema = require("./user.schema.server")();
    var User =  mongoose.model("Project.User", UserSchema);
    var q = require('q');
    var api = {
        createUser: createUser,
        findUserById: findUserById,
        findUserByCredentials: findUserByCredentials,
        findUserByGoogleId: findUserByGoogleId,
        findUserByFacebookId: findUserByFacebookId,
        deleteUser: deleteUser,
        updateUser: updateUser,
        followUser: followUser,
        unfollowUser : unfollowUser,
        findUserByUsername: findUserByUsername,
        updateRatesandReviews: updateRatesandReviews,
        findAllUsers: findAllUsers

    };
    return api;

    function findUserByGoogleId(id) {
        var deferred = q.defer();
        User.findOne({'google.id': id}, function(err, user){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(user);
            }
        });
        return deferred.promise;
    }

    function findUserByFacebookId(id) {
        //return User.findOne({"facebook.id": id});

        var deferred = q.defer();
        User.findOne({'facebook.id': id}, function(err, user){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(user);
            }
        });
        return deferred.promise;
    }

    function findAllUsers() {
        return User.find();
    }


    function updateRatesandReviews(id, rateandreview) {
        var rate = rateandreview.rates;
        var review = rateandreview.reviews;
        return User
            .update({_id: id},
                {$push: {rates: rate,
                        reviews : review }}
            );
    }


    function findUserById(userId) {
        var deferred = q.defer();
        User.findById(userId, function(err, user){
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(user);
            }
        });
        return deferred.promise;
    }

    function findUserByUsername(username) {
        var deferred = q.defer();
        User.findOne({username: username}, function(err, user) {
            if(err)
                deferred.reject(err);
            else
                deferred.resolve(user);
        });

        return deferred.promise;
    }

    function updateUser(userId, user) {
        delete user._id;
        return User
            .update({_id: userId},{
                $set: {firstName : user.firstName,
                    lastName : user.lastName,
                    email: user.email,
                      admin : user.admin}}
            );
    }


    function unfollowUser(id, username) {
        return User.update(
            {_id: id},
            {$pull: {follows:{username: username
                    }
            }
            }
        );
    }

    function followUser(id, follows) {
        return User
            .update({_id: id},
                {$push: {follows: follows}}
            );
    }

    function deleteUser(userId) {
        var deferred = q.defer();
        User.findByIdAndRemove(userId, function(err, user) {
            if(err)
                deferred.reject(err);
            else
            {
                user.remove();
                deferred.resolve(user);
            }
        });

        return deferred.promise;
    }
    
    function findUserByCredentials(username, password) {
        var deferred = q.defer();
        User.findOne({username: username, password: password}, function(err, user) {
            if(err)
                deferred.reject(err);
            else
                deferred.resolve(user);
        });

        return deferred.promise;
    }

    function createUser(user){
        var deferred = q.defer();
        User.create(user, function(err, user) {
            if(err)
                deferred.reject(err);
            else
                deferred.resolve(user);
        });

        return deferred.promise;
    }

};