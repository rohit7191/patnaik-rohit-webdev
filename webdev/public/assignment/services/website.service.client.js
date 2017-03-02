
(function () {
    angular
        .module("WebAppMaker")
        .service("WebsiteService", WebsiteService);

    function WebsiteService($http) {
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
        }

        function findWebsitesByUser(userId) {
            return $http.get("/api/user/"+ userId + "/website");
        }

        function deleteWebsite(websiteId) {
            return $http.delete("/api/website/"+ websiteId);
        }

        function createWebsite(userId, website) {
            return $http.post("/api/user/"+ userId +"/website", website);
        }

        function updateWebsite(websiteId, website) {
            return $http.put("/api/website/"+ websiteId, website);
        }

    }
})();