/**
 * Created by Rohit Patnaik on 2/14/2017.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("PageNewController", PageNewController);

    function PageNewController($routeParams, PageService, $location) {
        var vm = this;

        // event handlers
        vm.createPage = createPage;

        var userId = $routeParams.uid;

        var websiteId = $routeParams.wid;

        function init(){
            vm.userId = userId;
            vm.websiteId = websiteId;
            var pages = PageService.findPageByWebsiteId(websiteId);
            vm.pages = pages;
        }
        init();

        function createPage(newPage) {
            PageService.createPage(websiteId,newPage);
            $location.url('/user/' + userId + "/website/" + websiteId + "/page");

        }
    }
})();