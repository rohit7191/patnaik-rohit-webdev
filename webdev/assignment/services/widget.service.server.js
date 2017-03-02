/**
 * Created by Rohit Patnaik on 2/22/2017.
 */
module.exports = function (app) {
    app.post("/api/page/:pageId/widget", createWidget);
    app.get("/api/page/:pageId/widget", findWidgetsByPageId);
    app.get("/api/widget/:widgetId", findWidgetById);
    app.put("/api/widget/:widgetId", updateWidget);
    app.delete("/api/widget/:widgetId", deleteWidget);
    app.put("/page/:pageId/widget", sortable);

    var widgets = [
        { "_id": "123", "widgetType": "HEADER", "pageId": "432", "size": 2, "text": "GIZMODO"},
        { "_id": "234", "widgetType": "HEADER", "pageId": "432", "size": 4, "text": "Lorem ipsum"},
        { "_id": "345", "widgetType": "IMAGE", "pageId": "432", "width": "100%",
            "url": "http://lorempixel.com/400/200/"},
        { "_id": "456", "widgetType": "HEADER", "pageId": "432", "size": 3, "text": "Lorem ipsum"},
        { "_id": "567", "widgetType": "HEADER", "pageId": "432", "size": 4, "text": "Lorem ipsum"},
        { "_id": "678", "widgetType": "YOUTUBE", "pageId": "432", "width": "100%",
            "url": "https://youtu.be/AM2Ivdi9c4E" },
        { "_id": "789", "widgetType": "HEADER", "pageId": "432", "size": 4, "text": "Lorem ipsum"}
    ];

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
        var destination = myFile.destination;

        for (var i in widgets) {
            if (widgets[i]._id == widgetId) {
                widgets[i].width = width;
                widgets[i].url = req.protocol + '://' + req.get('host') + "/uploads/" + myFile.filename;
                pageId = widgets[i].pageId;
            }
        }

        res.redirect("/assignment/#/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/" + widgetId);
    }

    function findWidgetsByPageId(req, res) {
        var widg = [];
        var pageId = req.params.pageId;
        for(var w in widgets){
            if(widgets[w].pageId == pageId) {
                widg.push(widgets[w]);
            }
        }
        res.json(widg);
    }

    function findWidgetById(req, res) {
        widgetId = req.params.widgetId;
        var widget = widgets.find(function (w) {
            return w._id == widgetId;
        });
        res.json(widget);
    }

    function updateWidget(req, res) {
        var widgetId = req.params.widgetId;
        var widget = req.body;
        for(var w in widgets) {
            if(widgets[w]._id == widgetId) {
                widgets[w] = widget;
                res.json(widgets[w]);
                return;
            }
        }
        res.json(404);
    }

    function deleteWidget(req, res) {
        var widgetId = req.params.widgetId;
        for(var w in widgets) {
            if(widgets[w]._id == widgetId) {
                widgets.splice(w, 1);
                res.json(w);
                return;
            }
        }
        res.json(404);
    }

    function createWidget(req, res) {
        var pageId = req.params.pageId;
        var widget = req.body;
        widget.pageId = pageId;
        widget._id = (new Date()).getTime();
        widgets.push(widget);
        res.json(widget);
    }

    function sortable(req,res){
        var initial = req.query.initial;
        var final = req.query.final;
        var pageId = req.params.pageId;
        var widgetsList = [];
        widgets = widgets.filter(function(w) {
            if(pageId === w.pageId) {
                widgetsList.push(w);
            }
            return widgets.indexOf(w) < 0
        });
        var widget  = widgetsList[initial];
        widgetsList.splice(initial, 1);
        widgetsList.splice(final,0, widget);
        widgets.push.apply(widgets, widgetsList);
        res.json(widgets);
    }
};