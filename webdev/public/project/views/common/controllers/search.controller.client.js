(function () {
    angular
        .module("MovieZone")
        .controller("searchController", searchController);

    function searchController (TmdbApiService, $rootScope, $routeParams, $location, UserService) {

        var vm = this;
        vm.searchMoviesfromSearchPage =searchMoviesfromSearchPage;
        vm.genreName = genreName;
        vm.logout = logout;
        vm.movieName = $routeParams.movieName;
        var searchText = $routeParams.movieName;

        function init() {
            searchMovies(searchText);
            getGenres();
            getLoggedInUser();
        }
        init();

        function getLoggedInUser() {
            if($rootScope.currentUser){
                vm.loggedIn = "true";
                loggedInUserId = $rootScope.currentUser._id;

            } else {
                vm.notloggedIn = "true";

            }
        }

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

        function searchMoviesfromSearchPage(searchText) {
            $location.url("/search/"+ searchText);
        }


        function searchMovies(searchText) {
            TmdbApiService
                .searchMovies(searchText)
                .then(function(response){
                        vm.movies = response.data.results;
                });
        }


        function genreName(id) {
            for (var genre in vm.genres) {
                if (vm.genres[genre].id === id){
                    return vm.genres[genre].name;
                }
            }
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
