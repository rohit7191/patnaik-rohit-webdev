/**
 * Created by Rohit Patnaik on 2/22/2017.
 */
module.exports = function (app, pageModel) {
    app.post("/api/website/:websiteId/page",createPage);
    app.get("/api/website/:websiteId/page", findPageByWebsiteId);
    app.get("/api/page/:pageId", findPageById);
    app.put("/api/page/:pageId", updatePage);
    app.delete("/api/page/:pageId", deletePage);


    function createPage(req, res) {
        var wid = req.params.websiteId;
        var page = req.body;
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
        pageModel
            .deletePage(pageId)
            .then(function (page) {
                res.json(page);
            }, function (error) {
                res.sendStatus(500).send(error);
            });
    }
};