module.exports = function () {
    var mongoose = require("mongoose");
 
    var UserSchema = mongoose.Schema ({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        admin: String,
        google: {
            id:    String,
            token: String
        },
        facebook: {
            id:    String,
            token: String
        },
        rates: [
            {
                name: String,
                tmdbId: String,
                rating: Number,
                imageUrl: String
            }
        ],
        reviews: [
            {
                name: String,
                tmdbId: String,
                review: String,
                imageUrl: String,
                visible: String,
                flagged: String
            }
        ],
        follows: [
            {
                userId: String,
                username: String
            }
    ]}, {collection: 'project.user'});
    return UserSchema;
};