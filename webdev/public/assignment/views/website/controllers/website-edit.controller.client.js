/**
 * Created by Rohit Patnaik on 2/14/2017.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("WebsiteEditController", WebsiteEditController);

    function WebsiteEditController($routeParams, WebsiteService, $location) {
        var userId = $routeParams.uid;
        var websiteId = $routeParams.wid;

        var vm = this;


        function init() {
            var websites = WebsiteService.findWebsitesByUser(userId);
            var thisWebsite = WebsiteService.findWebsiteById(websiteId);
            vm.websites = websites;
            vm.userId = userId;
            vm.thisWebsite = thisWebsite;
            vm.websiteId = websiteId;
        }
        init();

        vm.updateWebsite = updateWebsite;
        vm.deleteWebsite = deleteWebsite;

        function updateWebsite() {
            var website = WebsiteService.updateWebsite(websiteId, thisWebsite);
            if(website != null) {
                $location.url('/user/' + userId + "/website");
            } else {
                vm.error = "Error in updating the website";
            }
        }

        function deleteWebsite() {
            WebsiteService.deleteWebsite(websiteId);
            $location.url('/user/' + userId + "/website");
        }

    }
})();