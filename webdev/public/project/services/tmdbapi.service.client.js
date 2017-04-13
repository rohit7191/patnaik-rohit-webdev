(function () {
    angular
        .module("MovieZone")
        .factory("TmdbApiService", TmdbApiService);

    function TmdbApiService($http, $q) {
        var api ={
            searchMovies: searchMovies,
            getGenres: getGenres,
            getNowPlaying: getNowPlaying,
            getUpcomingMovies: getUpcomingMovies,
            findMovieByID: findMovieByID,
            findCastByID: findCastByID
        };

        var apikey = "cd414043d3beefb989e86630d7c9de48";
        var baseUrl = "https://api.themoviedb.org/3";
        return api;

        function getGenres() {
            var url = baseUrl + '/genre/movie/list?api_key=' + apikey;
            return $http.get(url);
        }
        function searchMovies(searchText) {
            var moviesSearchUrl = baseUrl + '/search/movie?api_key=' + apikey + '&query=' + searchText + '&language=en&include_adult=false';
            return $http.get(moviesSearchUrl);
        }
        function findMovieByID(id, callback) {
            var tags = 'videos,credits,reviews';
            $http.get(baseUrl + '/movie/' + id + '?api_key=' + apikey + '&append_to_response=' + tags)
                .success(callback);
        }
        function getNowPlaying() {
            var url = baseUrl + '/movie/now_playing?api_key=' + apikey;
            return $http.get(url);
        }
        function getUpcomingMovies() {
            var url = baseUrl + '/movie/upcoming?api_key=' + apikey;
            return $http.get(url);
        }

        function findCastByID(id, callback) {
            var tags = 'movie_credits';
            $http.get(baseUrl + '/person/' + id + '?api_key=' + apikey + '&append_to_response=' + tags)
                .success(callback);
        }
    }
})();