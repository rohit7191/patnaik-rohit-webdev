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
            console.log(websiteId);
            PageService
                .findPageByWebsiteId(websiteId)
                .success(function(pages) {
                    vm.pages = pages;
                });
        }
        init();
    }
})();

