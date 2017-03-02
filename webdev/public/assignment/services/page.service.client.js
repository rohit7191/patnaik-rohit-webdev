/**
 * Created by Rohit Patnaik on 2/14/2017.
 */
(function () {
    angular
        .module("WebAppMaker")
        .service("PageService", PageService);

    function PageService($http) {
        var api = {
            "createPage": createPage,
            "findPageByWebsiteId": findPageByWebsiteId,
            "findPageById": findPageById,
            "updatePage": updatePage,
            "deletePage": deletePage
        };
        return api;

        function createPage(wid, page) {
            return $http.post("/api/website/" + wid + "/page", page);
        }

        function findPageById(pageId) {
            return $http.get("/api/page/" + pageId);
        }

        function findPageByWebsiteId(wid) {
            return $http.get("/api/website/" + wid + "/page");
        }

        function deletePage(pageId) {
            return $http.delete("/api/page/" + pageId);
        }

        function updatePage(pageId, page) {
            return $http.put("/api/page/" + pageId, page);
        }

    }
})();