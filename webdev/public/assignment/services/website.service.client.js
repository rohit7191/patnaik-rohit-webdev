
(function () {
    angular
        .module("WebAppMaker")
        .service("WebsiteService", WebsiteService);

    function WebsiteService($http) {
        // var websites = [
        //     { "_id": "123", "name": "Facebook", update: new Date(),    "developerId": "456", "description": "Lorem" },
        //     { "_id": "234", "name": "Tweeter", update: new Date(),     "developerId": "456", "description": "Lorem" },
        //     { "_id": "456", "name": "Gizmodo", update: new Date(),     "developerId": "456", "description": "Lorem" },
        //     { "_id": "567", "name": "Tic Tac Toe", update: new Date(), "developerId": "123", "description": "Lorem" },
        //     { "_id": "678", "name": "Checkers", update: new Date(),    "developerId": "123", "description": "Lorem" },
        //     { "_id": "789", "name": "Chess", update: new Date(),       "developerId": "234", "description": "Lorem" }
        // ];
        // TODO: complete website crud functions
        var api = {
            "createWebsite": createWebsite,
            "findWebsitesByUser": findWebsitesByUser,
            "findWebsiteById": findWebsiteById,
            "updateWebsite": updateWebsite,
            "deleteWebsite": deleteWebsite
        };
        return api;

        function findWebsiteById(websiteId) {
            return $http.get("/api/website/"+ websiteId);
            // for(var w in websites) {
            //     if(websiteId == websites[w]._id) {
            //         return angular.copy(websites[w]);
            //     }
            // }
            // return null;
        }

        function findWebsitesByUser(userId) {
            // var sites = [];
            // for(var w in websites) {
            //     if(userId == websites[w].developerId) {
            //         sites.push(websites[w]);
            //     }
            // }
            // return sites;
            return $http.get("/api/user/"+ userId + "/website");
        }

        function deleteWebsite(websiteId) {
            // for(var w in websites) {
            //     if(websites[w]._id == websiteId) {
            //         websites.splice(w, 1);
            //     }
            // }
            return $http.delete("/api/website/"+ websiteId);
        }

        function createWebsite(userId, website) {
            // website.developerId = userId;
            // website._id = (new Date()).getTime();
            // website.update = new Date();
            // websites.push(website);
            return $http.post("/api/user/"+ userId +"/website", website);
        }

        function updateWebsite(websiteId, website) {
            // for(var w in websites) {
            //     if(websites[w]._id == websiteId) {
            //         websites[w].name = website.name;
            //         websites[w].description = website.description;
            //         return websites[w];
            //     }
            // }
            // return null;
            return $http.put("/api/website/"+ websiteId, website);
        }

    }
})();