/**
 * Created by Rohit Patnaik on 2/14/2017.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebSiteListController);

    function WebSiteListController($routeParams, WebsiteService) {
        var userId = $routeParams.uid;
        var websites = WebsiteService.findWebsitesByUser(userId);
        var vm = this;
        vm.websites = websites;
        vm.userId = userId;
    }
})();