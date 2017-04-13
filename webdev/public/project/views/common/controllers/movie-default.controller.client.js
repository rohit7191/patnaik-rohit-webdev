(function () {
    angular
        .module("MovieZone")
        .controller("movieDefaultController",movieDefaultController);

    function movieDefaultController(TmdbApiService, $rootScope, $location, $sce, UserService) {
        var vm = this;
        vm.genreName = genreName;
        vm.logout = logout;

        function init() {
            getGenres();
            getNowplayingMovies();
            getUpcomingMovies();
            getLoggedInUser();
        }

        return init();

         function logout() {
            UserService
                .logout()
                .then(
                    function (response) {
                        $location.url("/home");
                    },
                    function () {
                        $location.url("/home");
                    }
                );
        }
        function getLoggedInUser() {
            if($rootScope.currentUser){
                vm.loggedIn = "true";
                loggedInUserId = $rootScope.currentUser._id;

            } else {
                vm.notloggedIn = "true";

            }
        }

        function getGenres() {
            TmdbApiService
                .getGenres()
                .then(function (response){
                    vm.genres = response.data.genres;
                })
        }

        function getNowplayingMovies() {
            TmdbApiService
                .getNowPlaying()
                .then(function(response){
                    vm.nowPlaying = response.data.results;
                    
                });
        }

        function getUpcomingMovies() {
            TmdbApiService
                .getUpcomingMovies()
                .then(function(response){
                    vm.upcoming = response.data.results;
                });
        }

        function fetchAllUpComingVideos(resp) {
            var embedUrl = 'https://www.youtube.com/embed/';
            for (var r in resp) {
                if (resp[r].data.results.length > 0) {
                    vm.upcoming[r].video_url = $sce.trustAsResourceUrl(embedUrl + resp[r].data.results[0].key);
                }
            }
        }

        function fetchAllNowPlayingVideos(resp) {
            var embedUrl = 'https://www.youtube.com/embed/';
            for (var r in resp) {
                if (resp[r].data.results.length > 0) {
                    vm.nowPlaying[r].video_url = $sce.trustAsResourceUrl(embedUrl + resp[r].data.results[0].key);
                }
            }
        }

        function genreName(id) {
            for (var genre in vm.genres) {
                if (vm.genres[genre].id === id){
                    return vm.genres[genre].name;
                }
            }
        }
    }
})();
