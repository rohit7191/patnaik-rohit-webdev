var mongoose = require('mongoose');
var userSchema = require('./user.schema.server');
var userModel = mongoose.model('User', userSchema);
var q = require('q');

userModel.createUser = createUser;
userModel.findUserById = findUserById;
userModel.findUserByUsername = findUserByUsername;
userModel.findUserByCredentials = findUserByCredentials;
userModel.updateUser = updateUser;
userModel.deleteUser = deleteUser;

module.exports = userModel;

function createUser(user) {
    var deferred = q.defer();
    userModel.create(user, function(err, user) {
        if(err)
            deferred.reject(err);
        else
            deferred.resolve(user);
    });

    return deferred.promise;

}

function findUserById(userId) {
    var deferred = q.defer();
    userModel.findById(userId, function(err, user) {
        if(err)
            deferred.reject(err);
        else
            deferred.resolve(user);
    });

    return deferred.promise;

}

function findUserByCredentials(username, password) {
    var deferred = q.defer();
    userModel.findOne({username: username, password: password}, function(err, user) {
        if(err)
            deferred.reject(err);
        else
            deferred.resolve(user);
    });

    return deferred.promise;

}

function findUserByUsername(username) {
    var deferred = q.defer();
    userModel.findOne({username: username}, function(err, user) {
        if(err)
            deferred.reject(err);
        else
            deferred.resolve(user);
    });

    return deferred.promise;

}

function updateUser(userId, user) {
    var deferred = q.defer();
    userModel.findByIdAndUpdate(userId, user, function(err, user) {
        if(err)
            deferred.reject(err);
        else
            deferred.resolve(user);
    });

    return deferred.promise;

}

function deleteUser(userId) {
    var deferred = q.defer();
    userModel.findByIdAndRemove(userId, function(err, user) {
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














