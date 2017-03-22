(function () {
    angular
        .module("WebAppMaker")
        .controller("FlickrImageSearchController", FlickrImageSearchController);

    function FlickrImageSearchController($routeParams, $location, WidgetService, FlickrService) {
        var vm = this;

        function init() {

            vm.userId = $routeParams['uid'];
            vm.websiteId = $routeParams['wid'];
            vm.pageId = $routeParams['pid'];
            vm.currentWidgetId = $routeParams['wgid'];

            WidgetService.findWidgetById(vm.currentWidgetId)
                .success(function(curWidget){
                    vm.currentWidget = curWidget;
                })
                .error(function(err){
                    vm.error = "Could not fetch widget";
                });
        }

        init();

        vm.searchPhotos = function (searchinput) {

            FlickrService
                .searchPhotos(searchinput)
                .then(function (response) {
                    data = response.data.replace("jsonFlickrApi(", "");
                    data = data.substring(0, data.length - 1);
                    data = JSON.parse(data);
                    vm.photos = data.photos;
                }, function (err) {
                    vm.error = err;
                });
        };

        vm.selectPhoto = function (photo) {
            var url = "https://farm" + photo.farm + ".staticflickr.com/" + photo.server;
            url += "/" + photo.id + "_" + photo.secret + "_b.jpg";

            vm.currentWidget.url = url;

            WidgetService
                .updateWidget(vm.currentWidgetId, vm.currentWidget)
                .then(function (response) {
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/" + vm.currentWidgetId);
                }, function (err) {
                    vm.error = "Error! Flickr widget not updated";
                });
        }
    }
})();
