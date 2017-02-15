/**
 * Created by Rohit Patnaik on 2/14/2017.
 */
(function () {
    angular
        .module("WebAppMaker")
        .service("PageService", PageService);

    function PageService() {
        var pages = [
            { "_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem" },
            { "_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem" },
            { "_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem" }
        ];

        var api = {
            "createPage": createPage,
            "findPageByWebsiteId": findPageByWebsiteId,
            "findPageById": findPageById,
            "updatePage": updatePage,
            "deletePage": deletePage
        };
        return api;

        function createPage(wid, page) {
            page.websiteId = wid;
            page._id = (new Date()).getTime();
            pages.push(page);
        }

        function findPageByWebsiteId(wid) {
            for(var p in pages) {
                if(wid === pages[p].websiteId) {
                    return angular.copy(pages[p]);
                }
            }
            return null;
        }

        function findPageById(pageId) {
            var page = [];
            for(var p in pages) {
                if(pageId === pages[p]._id) {
                    page.push(pages[p]);
                }
            }
            return page;
        }

        function deletePage(pageId) {
            for(var p in pages) {
                if(pages[p]._id == pageId) {
                    pages.splice(p, 1);
                }
            }
        }

        function updatePage(pageId, page) {
            for(var p in pages) {
                if(pages[p]._id == pageId) {
                    pages[p].name = page.name;
                    pages[p].description = page.description;
                    return pages[p];
                }
            }
            return null;
        }

    }
})();