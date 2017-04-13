(function () {
    angular
        .module("MovieZone")
        .controller("ManageFlaggedReviewsController",ManageFlaggedReviewsController);

    function ManageFlaggedReviewsController(TmdbApiService, $rootScope, $location, $sce, UserService, MovieService) {
        var vm = this;

        vm.removeReview = removeReview;
        vm.donotremoveReview = donotremoveReview;
        vm.logout = logout;

        function init() {
            getLoggedInUser();
            findFlaggedReviews();
        }
        init();


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

        function removeReview(_id, tmdbId) {
            var reviewId = _id;

            var twoIds = {
                reviewId : reviewId,
                tmdbId : tmdbId
            };

            MovieService
                .removeReview(twoIds)
                .then(function (response) {
                        vm.reportReviewMessage = "Review deleted";
                        findFlaggedReviews();
                    },
                    function () {
                        vm.reportReviewErrorMessage = "Something went wrong. will report this";
                    }
                );
        }



        function donotremoveReview(_id, tmdbId) {
            var reviewId = _id;

            var twoIds = {
                reviewId : reviewId,
                tmdbId : tmdbId
            };

            MovieService
                .donotremoveReview(twoIds)
                .then(function (response) {
                        vm.reportReviewMessage = "Review kept since everything is fine.";
                        findFlaggedReviews();
                    },
                    function () {
                        vm.reportReviewErrorMessage = "Something went wrong. will report this";
                    }
                );
        }


        function findFlaggedReviews() {
            MovieService
                .findAllMovies()
                .then(function (response) {
                    var allMovies = response.data;
                    var resultset=[];
                    for(var i in allMovies){
                     for(var j in allMovies[i].reviews){

                         allMovies[i].reviews[j].tmdbId = allMovies[i].tmdbId;
                         allMovies[i].reviews[j].title= allMovies[i].title;
                         resultset.push(allMovies[i].reviews[j]);
                     }
                    }

                    vm.results = resultset;
                    
                    return resultset;
                });
        }
        function getLoggedInUser() {
            if($rootScope.currentUser){
                vm.loggedIn = "true";
                loggedInUserId = $rootScope.currentUser._id;

            } else {
                vm.notloggedIn = "true";

            }
        }
    }
})();