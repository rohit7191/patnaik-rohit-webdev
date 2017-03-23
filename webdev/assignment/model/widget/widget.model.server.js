var mongoose = require('mongoose');

var q = require('q');

var widgetSchema = require('./widget.schema.server');
var widgetModel = mongoose.model('Widget', widgetSchema);

widgetModel.createWidget = createWidget;
widgetModel.findAllWidgetsForPage = findAllWidgetsForPage;
widgetModel.findWidgetById = findWidgetById;
widgetModel.updateWidget = updateWidget;
widgetModel.deleteWidget = deleteWidget;
widgetModel.reorderWidget = reorderWidget;

module.exports = widgetModel;

var pageModel = require('../page/page.model.server');


function createWidget(pageId,widget) {

    var deferred = q.defer();

    widget._page = pageId;

    widgetModel
        .find({_page:pageId},function (err,widgets) {
            widget.order = widgets.length;
            widgetModel
                .create(widget,function (err,widget) {
                    if(err) {
                        deferred.reject(err);
                    } else {
                        deferred.resolve(widget);
                    }
                });
        });

    return deferred.promise;
}

function findAllWidgetsForPage(pageId) {
    return widgetModel
        .find({_page:pageId})
        .sort({order:1});
}

function findWidgetById(widgetId) {

    var deferred = q.defer();
    widgetModel
        .findById(widgetId, function (err, widget) {
            if(err)
                deferred.reject(err);
            else
                deferred.resolve(widget);
        });

    return deferred.promise;

}

function updateWidget(widgetId, widget) {

    var deferred = q.defer();

    widgetModel.findByIdAndUpdate(widgetId, widget, function (err, widget) {
        if(err)
            deferred.reject(err);
        else
            deferred.resolve(widget);
    });

    return deferred.promise;

}

function reorderWidget(pageId, start, end) {
    return widgetModel
        .find({_page: pageId}, function (err, widgets) {
            widgets.forEach(function (widget) {
                if (start < end) {
                    if (widget.order == start) {
                        widget.order = end;
                        widget.save();
                    }
                    else if (widget.order > start && widget.order <= end) {
                        widget.order = widget.order - 1;
                        widget.save();
                    }
                } else {
                    if (widget.order == start) {
                        widget.order = end;
                        widget.save();
                    }

                    else if (widget.order < start && widget.order >= end) {
                        widget.order = widget.order + 1;
                        widget.save();
                    }
                }
            });
        });
}

function deleteWidget(widgetId) {

    var deferred = q.defer();

    widgetModel
        .findByIdAndRemove(widgetId, function (err, status) {
             if(err)
                 deferred.abort(err);
             else
                deferred.resolve(status);
    });

    return deferred.promise;
}

