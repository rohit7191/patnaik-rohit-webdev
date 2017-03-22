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
            vm.userId = userId;
            vm.websiteId = websiteId;
            WebsiteService
                .findWebsitesByUser(userId)
                .success(function (websites) {
                    vm.websites = websites;
                });
            WebsiteService
                .findWebsiteById(websiteId)
                .success(function (thisWebsite) {
                    vm.thisWebsite = thisWebsite;
                });
        }
        init();

        vm.updateWebsite = updateWebsite;
        vm.deleteWebsite = deleteWebsite;
        // console.log("outside update");
        // console.log(websiteId);
        // console.log(vm.thisWebsite);
        function updateWebsite(thisWebsite) {
          WebsiteService
                .updateWebsite(thisWebsite._id, thisWebsite)
                .success(function (website) {
                    if(website != null) {
                        $location.url('/user/' + userId + "/website");
                    }
                })
                .error(function () {
                    vm.error = "Error in updating the website";
                });
        }

        function deleteWebsite(websiteId) {
            WebsiteService
                .deleteWebsite(vm.websiteId)
                .success(function () {
                    $location.url('/user/' + userId + "/website");
            });

        }

    }
})();