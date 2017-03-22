/**
 * Created by Rohit Patnaik on 2/14/2017.
 */
(function(){
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebSiteListController);

    function WebSiteListController($routeParams, WebsiteService) {
        var vm = this;
        var userId = $routeParams.uid;


        function init() {
            vm.userId = userId;
            WebsiteService
                .findWebsitesByUser(userId)
                .success(function(websites){
                    vm.websites = websites;
                });
        }
        init();
       // console.log(vm.websites);
    }
})();