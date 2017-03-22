var mongoose = require('mongoose');

var q = require('q');

var pageSchema = require('./page.schema.server');
var pageModel = mongoose.model('Page', pageSchema);

pageModel.createPage = createPage;
pageModel.findAllPagesForWebsite = findAllPagesForWebsite;
pageModel.findPageById = findPageById;
pageModel.updatePage = updatePage;
pageModel.deletePage = deletePage;

module.exports = pageModel;

var websiteModel = require('../website/website.model.server');

function createPage(websiteId, page) {

    var deferred = q.defer();
    page._website = websiteId;

    pageModel
        .create(page, function (err, page) {
            if(err)
                deferred.reject(err);
            else
                {
                websiteModel
                    .findWebsiteById(page._website)
                    .then(function (website) {
                        website.pages.push(page._id);
                        website.save(function (err) {
                            if(err)
                                deferred.reject(err);
                            else
                                deferred.resolve(page);
                        });
                    });
                }
            });

        return deferred.promise;

}

function findAllPagesForWebsite(websiteId) {

    var deferred = q.defer();

    pageModel.find({_website: websiteId}, function (err, pages) {
        if(err)
            deferred.reject(err);
        else
            deferred.resolve(pages);
    });

    return deferred.promise;

}

function findPageById(pageId) {

    var deferred = q.defer();

    pageModel.findById(pageId, function(err, page) {
        if(err)
            deferred.reject(err);
        else
            deferred.resolve(page);
    });

    return deferred.promise;

}

function updatePage(pageId, page) {

    var deferred = q.defer();

    pageModel.findByIdAndUpdate(pageId, page, function(err, page) {
        if(err)
            deferred.reject(err);
        else
            deferred.resolve(page);

    });

    return deferred.promise;

}

function deletePage(pageId) {

    var deferred = q.defer();

    pageModel.findByIdAndRemove(pageId, function (err, page) {
        if(err)
            deferred.reject(err);
        else
        {
            page.remove();
            deferred.resolve(page);
        }
    });

    return deferred.promise;

}