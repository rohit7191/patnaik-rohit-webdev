var mongoose = require('mongoose');
var q = require('q');
var websiteSchema = require('./website.schema.server');

var websiteModel = mongoose.model('Website', websiteSchema);

websiteModel.createWebsiteForUser = createWebsiteForUser;
websiteModel.findAllWebsitesForUser = findAllWebsitesForUser;
websiteModel.findWebsiteById  = findWebsiteById;
websiteModel.updateWebsite  = updateWebsite;
websiteModel.deleteWebsite = deleteWebsite;

module.exports = websiteModel;

var userModel = require('../user/user.model.server');

function createWebsiteForUser(userId, website) {
    var deferred = q.defer();
    website._user = userId;
    // console.log("Inside create website in model");
    // console.log(userId);

    websiteModel
        .create(website, function(err, website) {
            if(err)
                deferred.reject(err);
            else
            {
                userModel
                    .findUserById(website._user)
                    .then(function (user) {
                        user.websites.push(website._id);
                        user.save(function (err) {
                            if (err)
                                deferred.reject(err);
                            else
                                deferred.resolve(website);
                        });
                    });
            }
        });
    return deferred.promise;
}

function findAllWebsitesForUser(userId) {
   // console.log("inside website model find all websites by user");
   // console.log(userId);
   var deferred = q.defer();
    websiteModel.find({_user: userId}, function (err, websites) {
        if(err)
            deferred.reject(err);
            // console.log("error");}
         else
            deferred.resolve(websites);
            // console.log("success");}
    });

    return deferred.promise;

}

function findWebsiteById(websiteId) {
    // console.log(websiteId);
    // console.log("inside model");
    var deferred = q.defer();
    websiteModel.findById(websiteId, function (err, website) {
        if (err)
            deferred.reject(err);
        else
            deferred.resolve(website);
    });

    return deferred.promise;

}

function updateWebsite(websiteId, website) {

    var deferred = q.defer();
    websiteModel.findByIdAndUpdate(websiteId, website, function(err, website) {
        if(err)
            deferred.reject(err);
        else
        {
            deferred.resolve(website);
        }
    });

    return deferred.promise;

}

function deleteWebsite(websiteId, website) {

    var deferred = q.defer();
    websiteModel.findByIdAndRemove(websiteId, website, function (err, website) {
        if (err)
            deferred.reject(err);
        else {
            website.remove();
            deferred.resolve(website);
        }
    });

    return deferred.promise;

}








