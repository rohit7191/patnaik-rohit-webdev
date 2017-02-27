/**
 * Created by Rohit Patnaik on 2/21/2017.
 */
module.exports = function (app) {
    require("./services/user.service.server")(app);
    require("./services/website.service.server")(app);
    require("./services/page.service.server")(app);
    require("./services/widget.service.server")(app);
}