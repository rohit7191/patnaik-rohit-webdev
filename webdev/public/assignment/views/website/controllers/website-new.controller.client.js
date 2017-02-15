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

        var websiteId = $routeParams.wid


        function init() {
            vm.userId = userId;
            vm.websiteId = websiteId;
            var websites = WebsiteService.findWebsitesByUser(userId);
            vm.websites = websites;

            var website = WebsiteService.findWebsiteById(websiteId);
            vm.website = website;
        }
        init();

        function createWebsite(newWebsite) {
            WebsiteService.createWebsite(userId,newWebsite);
            $location.url('/user/' + userId + "/website");

        }
    }
})();