(function(){
    angular
        .module("WebAppMaker")
        .service("FlickrService", FlickrService);

    var key = "e7461590aafac963912d6146573ce979";
    var secret = "57575b0d82f20614";
    var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";

    function FlickrService($http){

        var api = {
            searchPhotos : searchPhotos
        };
        return api;



        function searchPhotos(searchTerm){
            var url = urlBase
                .replace("API_KEY", key)
                .replace("TEXT", searchTerm);
            return $http.get(url);
        }

    }
})();
