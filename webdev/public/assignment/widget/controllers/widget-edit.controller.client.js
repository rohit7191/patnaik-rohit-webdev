(function(){
    angular
        .module("WebAppMaker")
        .controller("WidgetEditController",WidgetEditController);

    function WidgetEditController($routeParams, WidgetService, $location) {

        var vm = this;

        var userId = $routeParams.uid;
        vm.userId = userId;

        var websiteId = $routeParams.wid;
        vm.websiteId = websiteId;

        var pageId = $routeParams.pid;
        vm.pageId = pageId;

        var widgetId = $routeParams.wgid;
        vm.widgetId = widgetId;

        // event handlers
        vm.updateWidget = updateWidget;
        vm.deleteWidget = deleteWidget;

        var widgets = WidgetService.findWidgetsByPageId(pageId);
        vm.widgetId = widgets;

        var widget = WidgetService.findWidgetById(widgetId);
        vm.widget = widget;

        function updateWidget(thisWidget) {
            var widget = WidgetService.updateWidget(widgetId, thisWidget);
            if(widget != null) {
                $location.url('/user' + userId + "/website/" + websiteId + "/page/" + pageId + "/widget");
            }
            else
            {
                vm.error = "Error! Widget not updated";
            }
        }

        function deleteWidget() {
            WidgetService.deleteWidget(widgetId);
            location.url('/user/' + userId + "/website/" + websiteId + "/page/" + pageId + "/widget");

        }
    }
})();
