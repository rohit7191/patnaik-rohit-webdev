(function () {
    angular
        .module("MovieZone")
        .controller("MovieInfoController",MovieInfoController);
    
    function MovieInfoController($routeParams, $rootScope, TmdbApiService, $sce, $location, MovieService, UserService) {
        var vm = this;

        vm.id = $routeParams.id;
        vm.reviewPage = reviewPage;
        vm.giveError = giveError;
        var submitted = false;
        vm.logout = logout;
        vm.reportReview = reportReview;
        vm.needtoLoginforProfile = needtoLoginforProfile;
        var loggedInUserId = null;

        function init() {
            getMovieDetails();
            getMovieReviewsandRatings();
            getLoggedInUser();
        }
        return init();

        function reportReview(_id) {

            var reviewId = _id;
            var tmdbId = vm.id;
            
            var twoIds = {
                reviewId : reviewId,
                tmdbId : tmdbId
            };
            MovieService
                .reportReview(twoIds)
                .then(function (response) {
                    vm.reportReviewMessage = "Review reported. Admin will verify and take action";
                    },
                    function () {
                        vm.reportReviewErrorMessage = "Something went wrong.";
                    }
                );

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


        function  needtoLoginforProfile() {
            vm.givecheckoutusererror ="You need to login to check User's profile";
        }

        function giveError() {
            vm.notLoggedInError = "You need to login to review.";
        }
        
        function getLoggedInUser() {
            if($rootScope.currentUser){
                vm.loggedIn = "true";
                loggedInUserId = $rootScope.currentUser._id;

            } else {
                vm.notloggedIn = "true";

            }
        }

     function getMovieReviewsandRatings() {
            MovieService
                .findMovieById(vm.id)
                .then(function (response) {
                    vm.movieInfo = response.data;
                    var noOfRatings = vm.movieInfo.ratings.length;
                    var sumOfRatings = 0;
                    for (var i in vm.movieInfo.ratings){
                         var sumOfRatings = sumOfRatings + vm.movieInfo.ratings[i].value;
                    }
                    var avgRating = sumOfRatings/noOfRatings;
                    vm.avgRating = avgRating.toFixed(1);
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

        function reviewPage() {
            UserService
                    .findUserById(loggedInUserId)
                    .then(function (response) {
                        var usersReviews = response.data.reviews;
                        for(var i in usersReviews){
                            if(usersReviews[i].tmdbId == vm.id){
                                vm.error = "Review already submitted.";

                                return;
                            }
                        }
                        $location.url("/movie/"+ vm.id +"/review");

                    });
            }
    }
})();
