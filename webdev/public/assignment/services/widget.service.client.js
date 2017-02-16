/**
 * Created by Rohit Patnaik on 2/14/2017.
 */
(function () {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);

    function WidgetService() {
        var widgets = [
            { "_id": "123", "widgetType": "HEADER", "pageId": "432", "size": 2, "text": "GIZMODO"},
            { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "345", "widgetType": "IMAGE", "pageId": "432", "width": "100%",
                "url": "http://lorempixel.com/400/200/"},
            { "_id": "456", "widgetType": "HTML", "pageId": "432", "text": "<p>Lorem ipsum</p>"},
            { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "678", "widgetType": "YOUTUBE", "pageId": "432", "width": "100%",
                "url": "https://youtu.be/AM2Ivdi9c4E" },
            { "_id": "789", "widgetType": "HTML", "pageId": "432", "text": "<p>Lorem ipsum</p>"}
        ];
        var api = {
            "findWidgetsByPageId": findWidgetsByPageId,
            "findWidgetById": findWidgetById,
            "updateWidget": updateWidget,
            "deleteWidget": deleteWidget,
            "createWidget": createWidget

        };
        return api;

        function findWidgetsByPageId(pageId) {
            var widg = [];
            for(var w in widgets){
                if(widgets[w].pageId == pageId) {
                    widg.push(widgets[w]);
                }
            }
            return widg;
        }

        function findWidgetById(widgetId) {
            for(var w in widgets) {
                if(widgets[w]._id == widgetId) {
                    return angular.copy(widgets[w]);
                }
            }
            return null;
        }

        function updateWidget(widgetId, widget) {
            for(var w in widgets) {
                if(widgets[w]._id == widgetId) {
                    widgets[w] = widget;
                    return widgets[w];
                }
            }
            return null;
        }

        function deleteWidget(widgetId) {
            for(var w in widgets) {
                if(widgets[w]._id == widgetId) {
                    widgets.splice(w, 1);
                }
            }
        }

        function createWidget(pageId, type) {
            var widget = { "_id": (new Date()).getTime(), "widgetType": type, "pageId": pageId, "size": 0, "text": ""};
            widgets.push(widget);
            return widget;
        }
    }
})();