/**
 * Created by Rohit Patnaik on 2/14/2017.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("PageEditController", PageEditController);

    function PageEditController($routeParams, PageService,$location) {
        // event handlers
        var vm = this;
        vm.updatePage = updatePage;
        vm.deletePage = deletePage;

        var userId = $routeParams.uid;
        var websiteId = $routeParams.wid;
        var pageId = $routeParams.pid;
        vm.userId = userId;
        vm.websiteId = websiteId;
        vm.pageId = pageId;

        var pages = PageService.findPageByWebsiteId(websiteId);
        vm.pages = pages;

        var thisPage = PageService.findPageById(pageId);
        vm.thisPage = thisPage;

        function updatePage() {
            var page = PageService.updatePage(pageId, thisPage);
            if(page != null) {
                $location.url('/user/' + userId + "/website/" + websiteId + "/page");
            } else {
                vm.error = "Error in updating page";
            }
        }
        function deletePage() {
            PageService.deletePage(pageId);
            $location.url('/user/' + userId + "/website/" + websiteId + "/page");
        }
    }
})();