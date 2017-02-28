/**
 * Created by Rohit Patnaik on 2/22/2017.
 */
module.exports = function (app) {
    app.post("/api/page/:pageId/widget", createWidget);
    app.get("/api/page/:pageId/widget", findWidgetsByPageId);
    app.get("/api/widget/:widgetId", findWidgetById);
    app.put("/api/widget/:widgetId", updateWidget);
    app.delete("/api/widget/:widgetId", deleteWidget);

    var widgets = [
        { "_id": "123", "widgetType": "HEADER", "pageId": "432", "size": 2, "text": "GIZMODO"},
        { "_id": "234", "widgetType": "HEADER", "pageId": "432", "size": 4, "text": "Lorem ipsum"},
        { "_id": "345", "widgetType": "IMAGE", "pageId": "432", "width": "100%",
            "url": "http://lorempixel.com/400/200/"},
        { "_id": "456", "widgetType": "HEADER", "pageId": "432", "text": "<p>Lorem ipsum</p>"},
        { "_id": "567", "widgetType": "HEADER", "pageId": "432", "size": 4, "text": "Lorem ipsum"},
        { "_id": "678", "widgetType": "YOUTUBE", "pageId": "432", "width": "100%",
            "url": "https://youtu.be/AM2Ivdi9c4E" },
        { "_id": "789", "widgetType": "HEADER", "pageId": "432", "text": "<p>Lorem ipsum</p>"}
    ];

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
        console.log("inside createwidget server service");
        console.log(pageId);
        console.log(widget);
        widget.pageId = pageId;
        widget._id = (new Date()).getTime();
        widgets.push(widget);
        res.json(widget);
    }
};