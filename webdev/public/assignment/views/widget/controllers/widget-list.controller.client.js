/**
 * Created by Rohit Patnaik on 2/14/2017.
 */
(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController);

    function WidgetListController($sce, $routeParams, WidgetService) {
        var vm = this;

        userId = $routeParams.uid;
        websiteId = $routeParams.wid;
        pageId = $routeParams.pid;
        vm.doYouTrustUrl = doYouTrustUrl;

        function init() {
            vm.userId = userId;
            vm.websiteId = websiteId;
            vm.pageId = pageId;
            var widgets = WidgetService.findWidgetsByPageId(pageId);
            vm.widgets = widgets;
        }
        init();

        function doYouTrustUrl(url) {
            var baseUrl = "https://www.youtube.com/embed/";
            var urlParts = url.split('/');
            var id = urlParts[urlParts.length - 1];
            baseUrl += id;
            return $sce.trustAsResourceUrl(baseUrl);
        }
    }
})();