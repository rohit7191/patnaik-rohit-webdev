(function () {
    angular
        .module("MovieZone")
        .controller("MovieReviewController",MovieReviewController);
    function MovieReviewController($routeParams, $rootScope, $location,  $sce,TmdbApiService, UserService, MovieService) {
        var vm = this;
        vm.id = $routeParams.id;
        var userId = $rootScope.currentUser._id;
        var tmdbId = $routeParams.id;
        vm.submitRatingReview = submitRatingReview;
        vm.logout = logout;

        function init() {
            getMovieDetails();
            getUserName();
            getLoggedInUser();
        }
        return init();

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

        function getUserName() {
            UserService
                .findUserById(userId)
                .then(function (response) {
                    var returnedUser = response.data;
                    if(returnedUser._id){
                        vm.userName = returnedUser.username;
                    }else{
                        vm.error = "unable to add review";
                    }
                });


        }

        function getMovieDetails() {
            TmdbApiService.findMovieByID(vm.id,
                function (response) {
                    if (response.videos.results.length > 0) {
                        var embedUrl = 'https://www.youtube.com/embed/';
                        response.video_path = $sce.trustAsResourceUrl(embedUrl + response.videos.results[0].key);
                        response.untrusted_video_url = embedUrl + response.videos.results[0].key;
                    }
                    response.credits.cast.splice(8, response.credits.cast.length - 8);
                    vm.movie = response;


                    vm.movie.criticsRating = response.vote_average / 2;
                    vm.movie.ratedByUsers = [];
                    vm.movie.reviewedByUsers = [];
                    var now = new Date();
                    var releaseDate = new Date(response.release_date);
                    if(now > releaseDate) {
                        vm.released = true;
                    }

                });
        }

        function submitRatingReview(review, movie, userName) {
            

            var imageUrl = "https://image.tmdb.org/t/p/w130/"+ movie.poster_path;
            var rates = {
               name : movie.title,
               tmdbId : tmdbId,
               rating : parseInt(review.rating),
               imageUrl : imageUrl
            };
            var reviews = {
                name: movie.title,
                tmdbId : tmdbId,
                review : review.reviewtext,
                imageUrl : imageUrl
            };
            var rateandreview ={
                rates : rates,
                reviews : reviews
            };
            var ratings = {
                userId :userId,
                username: userName,
                value : parseInt(review.rating)
            };
            var reviews = {
                userId : userId,
                username: userName,
                text : review.reviewtext,
                visible : "true",
                flagged : "false"

            };
            var ratingsandreviews = {
                ratings : ratings,
                reviews : reviews
            };
            var movie ={
                tmdbId : tmdbId,
                title: movie.title,
                imageUrl : imageUrl,
                ratings : [ratings],
                reviews : [reviews]

            };
            UserService
                .submitRatingReview(userId,rateandreview)
                .then(function (response) {
                    var i = 1;
                });
 
   
                MovieService
                    .findMovieById(tmdbId)
                    .then(function (response) {
                        var returnedmovie = response.data;
                        if(returnedmovie.tmdbId){
                            MovieService
                                .updateRatingAndReview(tmdbId, ratingsandreviews)
                                .then(function (response) {
                                    var addedObject = response.data;
                                    if(addedObject){
                                        $location.url("/movie/"+ tmdbId);
                                    }else{
                                        vm.error = "unable to add review";
                                    }
                                });
                        }else{
                            MovieService
                                .createMovie(movie)
                                .then(function (response) {
                                    var addedObject = response.data;
                                    if(addedObject){
                                        $location.url("/movie/"+ tmdbId);
                                    }else{
                                        vm.error = "unable to add new Movie";
                                    }
                                });
                        }
                    });




        }



    }


})();
