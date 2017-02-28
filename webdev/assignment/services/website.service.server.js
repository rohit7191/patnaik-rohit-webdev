/**
 * Created by Rohit Patnaik on 2/22/2017.
 */
module.exports = function (app) {
    app.post("/api/user/:userId/website",createWebsite);
    app.get("/api/user/:userId/website", findWebsitesByUser);
    app.get("/api/website/:websiteId", findWebsiteById);
    app.put("/api/website/:websiteId", updateWebsite);
    app.delete("/api/website/:websiteId", deleteWebsite);

    var websites = [
        { "_id": "123", "name": "Facebook", update: new Date(),    "developerId": "456", "description": "Lorem" },
        { "_id": "234", "name": "Tweeter", update: new Date(),     "developerId": "456", "description": "Lorem" },
        { "_id": "456", "name": "Gizmodo", update: new Date(),     "developerId": "456", "description": "Lorem" },
        { "_id": "567", "name": "Tic Tac Toe", update: new Date(), "developerId": "123", "description": "Lorem" },
        { "_id": "678", "name": "Checkers", update: new Date(),    "developerId": "123", "description": "Lorem" },
        { "_id": "789", "name": "Chess", update: new Date(),       "developerId": "234", "description": "Lorem" }
    ];

    function findWebsitesByUser(req, res) {
        var userId = req.params.userId;

        var sites = [];
        for(var w in websites) {
            if(userId == websites[w].developerId) {
                sites.push(websites[w]);
            }
        }
        res.json(sites);
    }

    function findWebsiteById(req, res) {
        var websiteId = req.params.websiteId;
        var website = websites.find(function (w) {
            return w._id == websiteId;
        });
        res.json(website);
    }

    function createWebsite(req, res) {
        var userId = req.params.userId;
        var website = req.body;
        website._id = (new Date()).getTime();
        website.developerId = userId;
        websites.push(website);
        res.json(website);
    }

    function deleteWebsite(req, res) {
        var websiteId = req.params.websiteId;
        for(var w in websites) {
            if(websites[w]._id == websiteId) {
                websites.splice(w, 1);
                res.json(w);
                return;
            }
        }
    }
    function updateWebsite(req, res) {
        var websiteId = req.params.websiteId;
        var website = req.body;
        for(var w in websites) {
            if(websites[w]._id == websiteId) {
                websites[w].name = website.name;
                websites[w].description = website.description;
                res.json(website[w]);
                return;
            }
        }
        res.sendStatus(404);
    }
};