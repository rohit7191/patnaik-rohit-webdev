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

        var websiteId = $routeParams.wid;


        function init() {
            vm.userId = userId;
            vm.websiteId = websiteId;

            WebsiteService
                .findWebsitesByUser(userId)
                .success(function (websites) {
                    vm.websites = websites;
            });
        }
        init();

        function createWebsite(new_Website) {
            WebsiteService
                .createWebsite(vm.userId,new_Website)
                .success(function () {
                    $location.url('/user/' + userId + "/website");
                });


        }
    }
})();