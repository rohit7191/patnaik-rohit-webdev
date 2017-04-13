module.exports = function() {
    var q = require('q');
    var mongoose = require ("mongoose");
    var MovieSchema = require("./movie.schema.server.js")();
    var Movie  = mongoose.model("Movie", MovieSchema);

    var api = {
        findMovieById : findMovieById,
        updateRatingAndReview : updateRatingAndReview,
        createMovie: createMovie,
        findAllMovies: findAllMovies
        
    };
    return api;

    function createMovie(movie) {
        var deferred = q.defer();
        Movie.create(movie, function(err, movie) {
            if(err)
                deferred.reject(err);
            else
                deferred.resolve(movie);
        });

        return deferred.promise;
    }

    function findMovieById(id) {
       return Movie.find({tmdbId: id});
    }

    function findAllMovies() {
        var deferred = q.defer();

        Movie.find(function(err, movie) {
            if(err)
                deferred.reject(err);
            else
                deferred.resolve(movie);
        });

        return deferred.promise;
    }

    function updateRatingAndReview(id, ratingsandreviews) {
        var ratings = ratingsandreviews.ratings;
        var reviews = ratingsandreviews.reviews;
        return Movie
            .update({tmdbId: id},
                {$push: {ratings: ratings,
                    reviews: reviews}}
            );
    }

};