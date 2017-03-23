/**
 * Created by Rohit Patnaik on 2/22/2017.
 */
module.exports = function (app, widgetModel) {
    app.post("/api/page/:pageId/widget", createWidget);
    app.get("/api/page/:pageId/widget", findWidgetsByPageId);
    app.get("/api/widget/:widgetId", findWidgetById);
    app.put("/api/widget/:widgetId", updateWidget);
    app.delete("/api/widget/:widgetId", deleteWidget);
    app.put("/page/:pageId/widget", reorderWidget);

    var multer = require('multer');
    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, __dirname + "/../../public/uploads")
        },
        filename: function (req, file, cb) {
            var extArray = file.mimetype.split("/");
            var extension = extArray[extArray.length - 1];
            cb(null, 'widget_image_' + Date.now() + '.' + extension)
        }
    });
    var upload = multer({storage: storage});

    app.post("/api/upload", upload.single('myFile'), uploadImage);

    function uploadImage(req, res) {
        var userId = req.body.userId;
        var websiteId = req.body.websiteId;
        var pageId = null;
        var widgetId = req.body.widgetId;
        var width = req.body.width;
        var myFile = req.file;

        widgetModel
            .findWidgetById(widgetId)
            .then(
                function (widget) {
                    widget.url =  req.protocol + '://' + req.get('host') + "/uploads/" + myFile.filename;
                    pageId = widget._page;

                    widgetModel
                        .updateWidget(widget._id, widget)
                        .then(
                            function (updatedWidget) {
                                res.redirect("/assignment/#/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/" + widgetId);
                            },
                            function (failedUpdate) {
                                res.sendStatus(400).send(failedUpdate);
                            }
                        );
                },
                function (error) {
                    res.sendStatus(400).send(error);
                }
            );
    }

    function findWidgetsByPageId(req, res) {
        var pageId = req.params.pageId;
        widgetModel
            .findAllWidgetsForPage(pageId)
            .then(function (widgets) {
                res.json(widgets);
            }, function (error) {
                res.sendStatus(500).send(error);
            });
    }

    function findWidgetById(req, res) {
        var widgetId = req.params.widgetId;
        widgetModel
            .findWidgetById(widgetId)
            .then(function (widget) {
                res.json(widget);
            }, function (error) {
                res.sendStatus(500).send(error);
            });
    }

    function updateWidget(req, res) {
        var widgetId = req.params.widgetId;
        var widget = req.body;
        widgetModel
            .updateWidget(widgetId, widget)
            .then(function (widget) {
                res.json(widget);
            }, function (error) {
                res.sendStatus(500).send(error);
            });
    }

    function deleteWidget(req, res) {
        var widgetId = req.params.widgetId;
        widgetModel
            .deleteWidget(widgetId)
            .then(function (widget) {
                res.json(widget);
            }, function (error) {
                res.sendStatus(500).send(error);
            });
    }

    function createWidget(req, res) {
        var pageId = req.params.pageId;
        var widget = req.body;
        widgetModel
            .createWidget(pageId, widget)
            .then(function (widget) {
                res.json(widget);
            }, function (error) {
                res.sendStatus(500).send(error);
            });
    }


    function reorderWidget(req, res) {
        var start = req.query.initial;
        var end = req.query.final;
        var pageId = req.params.pageId;

        widgetModel
            .reorderWidget(pageId, start, end)
            .then(function (widget) {
                res.json(widget);
            }, function (error) {
                res.sendStatus(500).send(error);
            });
    }

};