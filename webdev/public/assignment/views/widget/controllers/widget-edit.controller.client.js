(function(){
    angular
        .module("WebAppMaker")
        .controller("WidgetEditController",WidgetEditController);

    function WidgetEditController($routeParams, WidgetService, $location) {

        var vm = this;

        var userId = $routeParams.uid;


        var websiteId = $routeParams.wid;

        var pageId = $routeParams.pid;


        var widgetId = $routeParams.wgid;


        // event handlers
        vm.updateWidget = updateWidget;
        vm.deleteWidget = deleteWidget;


        function init() {
            vm.userId = userId;
            vm.websiteId = websiteId;
            vm.pageId = pageId;
            vm.widgetId = widgetId;
            var widgets = WidgetService.findWidgetsByPageId(pageId);
            vm.widgetId = widgets;

            var widget = WidgetService.findWidgetById(widgetId);
            vm.widget = widget;

        }

        init();

        function updateWidget(thisWidget) {
            var widget = WidgetService.updateWidget(widgetId, thisWidget);
            if(widget != null) {
                $location.url('/user/' + userId + "/website/" + websiteId + "/page/" + pageId + "/widget");
            }
            else
            {
                vm.error = "Error! Widget not updated";
            }
        }

        function deleteWidget() {
            WidgetService.deleteWidget(widgetId);
                $location.url('/user/' + userId + "/website/" + websiteId + "/page/" + pageId + "/widget");

        }
    }
})();
