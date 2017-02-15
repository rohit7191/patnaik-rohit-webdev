(function(){
    angular
        .module("WebAppMaker")
        .config(configuration);

    function configuration($routeProvider, $locationProvider) {
        $routeProvider
            .when("/", {
                templateUrl: "user/templates/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/login", {
                templateUrl: "user/templates/login.view.client.html",
                controller: "LoginController",
                controllerAs: "model"
            })
            .when("/register", {
                templateUrl: "user/templates/register.view.client.html",
                controller: "RegisterController",
                controllerAs: "model"
            })
            .when("/user/:uid", {
                templateUrl: "user/templates/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model"
            })
            .when("/user/:uid/website", {
                templateUrl: "website/templates/website-list.view.client.html",
                controller: "WebsiteListController",
                controllerAs: "model"
            })
            .when("/user/:uid/website/new",{
                templateUrl: 'website/templates/website-new.view.client.html',
                controller: "WebsiteNewController",
                controllerAs: 'model'
            })
            .when("/user/:uid/website/:wid",{
                templateUrl: 'website/templates/website-edit.view.client.html',
                controller: "WebsiteEditController",
                controllerAs: "model"
            })
            .when("/user/:uid/website/:wid/page",{
                templateUrl: 'page/templates/page-list.view.client.html',
                controller: "PageListController",
                controllerAs: "model"
            })
            .when("/user/:uid/website/:wid/page/new", {
                templateUrl: 'page/templates/page-new.view.client.html',
                controller: "PageNewController",
                controllerAs: "model"
            })
            .when("/user/:uid/website/:wid/page/:pid", {
                templateUrl: 'page/templates/page-edit.view.client.html',
                controller: "PageEditController",
                controllerAs: "model"
            });


        // $locationProvider.html5Mode(true);
    }
})();