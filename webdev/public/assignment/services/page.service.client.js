/**
 * Created by Rohit Patnaik on 2/14/2017.
 */
(function () {
    angular
        .module("WebAppMaker")
        .service("PageService", PageService);

    function PageService($http) {
        // var pages = [
        //     { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
        //     { "_id": "432", "name": "Post 2", "websiteId": "567", "description": "Lorem" },
        //     { "_id": "543", "name": "Post 3", "websiteId": "567", "description": "Lorem" }
        // ];

        var api = {
            "createPage": createPage,
            "findPageByWebsiteId": findPageByWebsiteId,
            "findPageById": findPageById,
            "updatePage": updatePage,
            "deletePage": deletePage
        };
        return api;

        function createPage(wid, page) {
            // page.websiteId = wid;
            // page._id = (new Date()).getTime();
            // pages.push(page);
            return $http.post("/api/website/" + wid + "/page", page);
        }

        function findPageById(pageId) {
            // for(var p in pages) {
            //     if(pageId == pages[p]._id) {
            //         return angular.copy(pages[p]);
            //     }
            // }
            // return null;
            return $http.get("/api/page/" + pageId);
        }

        function findPageByWebsiteId(wid) {
            // var page = [];
            // for(var p in pages) {
            //     if(wid == pages[p].websiteId) {
            //         page.push(pages[p]);
            //     }
            // }
            // return page;
            console.log(wid);
            return $http.get("/api/website/" + wid + "/page");
        }

        function deletePage(pageId) {
            // for(var p in pages) {
            //     if(pages[p]._id == pageId) {
            //         pages.splice(p, 1);
            //     }
            // }
            return $http.delete("/api/page/" + pageId);
        }

        function updatePage(pageId, page) {
            // for(var p in pages) {
            //     if(pages[p]._id == pageId) {
            //         pages[p].name = page.name;
            //         pages[p].description = page.description;
            //         return pages[p];
            //     }
            // }
            // return null;
            return $http.put("/api/page/" + pageId, page);
        }

    }
})();