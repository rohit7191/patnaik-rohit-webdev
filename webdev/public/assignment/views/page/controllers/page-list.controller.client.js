(function(){
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController);

    function PageListController($routeParams, PageService) {
        var vm = this;
        var userId = $routeParams.uid;
        var websiteId = $routeParams.wid;

        function init(){
            vm.userId = userId;
            vm.websiteId = websiteId;
            var pages = PageService.findPageByWebsiteId(websiteId);

            vm.pages = pages;

        }

        init();

    }
})();

