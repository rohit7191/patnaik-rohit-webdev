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

        function init() {
            vm.userId = userId;
            vm.websiteId = websiteId;
            vm.pageId = pageId;
            PageService
                .findPageByWebsiteId(websiteId)
                .success(function (pages) {
                    vm.pages = pages;
                });

            PageService
                .findPageById(pageId)
                .success(function (thisPage) {
                    vm.thisPage = thisPage;
                });
        }
        init();


        function updatePage() {
            PageService
                .updatePage(pageId, vm.thisPage)
                .success(function (page) {
                    if(page != null) {
                        $location.url('/user/' + userId + "/website/" + websiteId + "/page");
                    }
                })
                .error(function () {
                    vm.error = "Error in updating page";
                });
        }

        function deletePage(pageId) {
            PageService
                .deletePage(vm.pageId)
                .success(function () {
                    $location.url('/user/' + userId + "/website/" + websiteId + "/page");
                });
        }
    }
})();