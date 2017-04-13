(function () {
    angular
        .module("MovieZone")
        .controller("homeController", homeController);
    
    function homeController(TmdbApiService,$location) {
        var vm = this;
        vm.genreName = genreName;
        function init() {

            getNowPlaying();
           getGenres();

        }
        init();

        function genreName(id) {
            for (var genre in vm.genres) {
                if (vm.genres[genre].id === id){
                    return vm.genres[genre].name;
                }
            }
        }

        function getNowPlaying() {
            TmdbApiService
                .getNowPlaying()
                .then(function(response){
                    vm.movies = response.data.results;
                });
        }
        function getGenres() {
            TmdbApiService
                .getGenres()
                .then(function (response){
                    vm.genres = response.data.genres;
                })
        }

    }
})();
