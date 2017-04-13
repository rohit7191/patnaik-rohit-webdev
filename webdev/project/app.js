
module.exports = function (app) {

    var models = require("./model/models.server.js")();

    // pas the models to services.
    require("./services/user.service.server.js")(app, models);
    require("./services/movie.service.server.js")(app, models);
 


};

