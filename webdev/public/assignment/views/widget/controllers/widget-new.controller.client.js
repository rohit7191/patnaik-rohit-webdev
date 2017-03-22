(function(){
    angular
        .module("WebAppMaker")
        .controller("WidgetNewController",WidgetNewController);

    function WidgetNewController($routeParams, WidgetService, $location) {
        var vm = this;

        var userId = $routeParams.uid;


        var websiteId = $routeParams.wid;


        var pageId = $routeParams.pid;


        //var widgetId = $routeParams.wgid;


        //event handler

        vm.createWidget = createWidget;

        function init() {
            vm.userId = userId;
            vm.websiteId = websiteId;
            vm.pageId = pageId;
           // vm.widgetId = widgetId;
            // WidgetService
            //     .findWidgetsByPageId(pageId)
            //     .success(function (widgets) {
            //         vm.widgets = widgets;
            //     });
            // WidgetService
            //     .findWidgetById(widgetId)
            //     .success(function (widget) {
            //         vm.widget = widget;
            //     });
        }
        init();

        function createWidget(type) {
            var widg = {};
            widg.type = type;

            WidgetService
                .createWidget(vm.pageId, widg)
                .success(function (w) {
                    $location.url('/user/' + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/" + w._id);
                });
        }
    }
})();
