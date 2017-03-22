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
            // WidgetService
            //     .findWidgetsByPageId(pageId)
            //     .success(function (widgets) {
            //         vm.widgets = widgets;
            //     });
            WidgetService
                .findWidgetById(widgetId)
                .success(function (widget) {
                    vm.widget = widget;
                });
        }
        init();

        function updateWidget() {
            WidgetService
                .updateWidget(widgetId, vm.widget)
                .success(function (widget) {
                    if(widget != null) {
                        $location.url('/user/' + userId + "/website/" + websiteId + "/page/" + pageId + "/widget");
                    }
                })
                .error(function () {
                    vm.error = "Error! Widget not updated";
                });
        }

        function deleteWidget(widgetId) {
            WidgetService
                .deleteWidget(vm.widgetId)
                .success(function () {
                    $location.url('/user/' + userId + "/website/" + websiteId + "/page/" + pageId + "/widget");
                });
        }
    }
})();
