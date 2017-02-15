/**
 * Created by Rohit Patnaik on 2/14/2017.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("WebsiteNewController", WebsiteNewController);

    function WebsiteNewController($routeParams, WebsiteService, $location) {
        var vm = this;
        vm.createWebsite = createWebsite;

        var userId = $routeParams.uid;
        vm.userId = userId;
        var websiteId = $routeParams.wid
        vm.websiteId = websiteId;
        var websites = WebsiteService.findWebsitesByUser(userId);
        vm.websites = websites;

        var website = WebsiteService.findWebsiteById(websiteId);
        vm.website = website;

        function createWebsite(newWebsite) {
            WebsiteService.createWebsite(userId,newWebsite);
            $location.url('/user/' + userId + "/website");

        }
    }
})();