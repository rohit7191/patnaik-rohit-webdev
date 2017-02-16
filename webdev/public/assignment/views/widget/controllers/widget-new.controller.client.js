(function(){
    angular
        .module("WebAppMaker")
        .controller("WidgetNewController",WidgetNewController);

    function WidgetNewController($routeParams, WidgetService, $location) {
        var vm = this;

        var userId = $routeParams.uid;


        var websiteId = $routeParams.wid;


        var pageId = $routeParams.pid;


        var widgetId = $routeParams.wgid;


        //event handler

        vm.createWidget = createWidget;

        function init() {
            vm.userId = userId;
            vm.websiteId = websiteId;
            vm.pageId = pageId;
            vm.widgetId = widgetId;
            var widgets = WidgetService.findWidgetsByPageId(pageId);
            vm.widgets = widgets;

            var widget = WidgetService.findWidgetById(widgetId);
            vm.widget = widget;

        }
        init();

        function createWidget(type){
            var widg = WidgetService.createWidget(vm.pageId, type);
            $location.url('/user/' + userId + "/website/" + websiteId + "/page/" + pageId + "/widget/" + widg._id);

        }
    }
})();
