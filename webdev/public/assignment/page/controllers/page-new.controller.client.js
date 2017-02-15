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
        vm.userId = userId;
        var websiteId = $routeParams.wid;
        vm.websiteId = websiteId;
        var pages = PageService.findPageByWebsiteId(websiteId);
        vm.pages = pages;


        function createPage(newPage) {
            PageService.createPage(vm.websiteId,newPage);
            $location.url('/user/' + userId + "/website/" + websiteId + "/page");

        }
    }
})();