(function(){
    angular
        .module("WebAppMaker")
        .controller("WidgetNewController",WidgetNewController);

    function WidgetNewController($routeParams, WidgetService, $location) {
        var vm = this;

        var userId = $routeParams.uid;
        vm.userId = userId;

        var websiteId = $routeParams.wid;
        vm.websiteId = websiteId;

        var pageId = $routeParams.pid;
        vm.pageId = pageId;

        var widgetId = $routeParams.wgid;
        vm.widgetId = widgetId;

        //event handler

        vm.createWidget = createWidget;

        var widgets = WidgetService.findWidgetsByPageId(pageId);
        vm.widgets = widgets;

        var widget = WidgetService.findWidgetById(widgetId);
        vm.widget = widget;

        function createWidget(new_Widget){
            WidgetSertvice.createWidget(pageId, new_Widget);
            location.url('/user/' + userId + "/website/" + websiteId + "/page/" + pageId + "/widget");

        }
    }
})();
