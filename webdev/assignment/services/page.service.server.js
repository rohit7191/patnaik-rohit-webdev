/**
 * Created by Rohit Patnaik on 2/22/2017.
 */
module.exports = function (app, pageModel) {
    app.post("/api/website/:websiteId/page",createPage);
    app.get("/api/website/:websiteId/page", findPageByWebsiteId);
    app.get("/api/page/:pageId", findPageById);
    app.put("/api/page/:pageId", updatePage);
    app.delete("/api/page/:pageId", deletePage);

    // var pages = [
    //     { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
    //     { "_id": "432", "name": "Post 2", "websiteId": "567", "description": "Lorem" },
    //     { "_id": "543", "name": "Post 3", "websiteId": "567", "description": "Lorem" }
    // ];

    function createPage(req, res) {
        var wid = req.params.websiteId;
        var page = req.body;
       //  page.websiteId = wid;
       // // console.log("inside page server service" + wid);
       //  page._id = (new Date()).getTime();
       //  pages.push(page);
       //  res.json(page);

        pageModel
            .createPage(wid, page)
            .then(function (page) {
                res.json(page);
            }, function (error) {
                res.sendStatus(500).send(error);
            });

    }

    function findPageByWebsiteId(req, res) {
        var wid = req.params.websiteId;
        //console.log(wid);
        // var page = [];
        // for(var p in pages) {
        //     if(wid == pages[p].websiteId) {
        //         page.push(pages[p]);
        //     }
        // }
        // res.json(page);
        pageModel
            .findAllPagesForWebsite(wid)
            .then(function (pages) {
                res.json(pages);
            }, function (error) {
                res.sendStatus(500).send(error);
            });
    }

    function findPageById(req, res) {
        var pageId = req.params.pageId;
        // var page = pages.find(function (p) {
        //     return p._id == pageId;
        // });
        // res.json(page);
        pageModel
            .findPageById(pageId)
            .then(function (page) {
                res.json(page);
            }, function (error) {
                res.sendStatus(500).send(error);
            });
    }

    function updatePage(req, res) {
        var pageId = req.params.pageId;
        var page = req.body;
        // for(var p in pages) {
        //     if(pages[p]._id == pageId) {
        //         pages[p].name = page.name;
        //         pages[p].description = page.description;
        //         res.json(pages[p]);
        //         return;
        //     }
        // }
        // res.json(404);
        pageModel
            .updatePage(pageId, page)
            .then(function (page) {
                res.json(page);
            }, function (error) {
                res.sendStatus(500).send(error);
            });
    }

    function deletePage(req, res) {
        var pageId = req.params.pageId;
        // for(var p in pages) {
        //     if(pages[p]._id == pageId) {
        //         pages.splice(p, 1);
        //         res.json(p);
        //         return;
        //     }
        // }
        // res.json(404);
        pageModel
            .deletePage(pageId)
            .then(function (page) {
                res.json(page);
            }, function (error) {
                res.sendStatus(500).send(error);
            });
    }
};