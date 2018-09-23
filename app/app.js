/**
 * Created by madongfang on 2016/9/1.
 */

//testServerAddr = "http://localhost:8082/"; // 开发测试时使用
testServerAddr = ""; // 发布时使用

var eastApp = angular.module("eastApp", ["ui.router", "restfulApiService", "appControllers", "appFilters",
    "ui.bootstrap", "userLogin", "ngFileUpload", "angular-md5"]);

eastApp.config(["$stateProvider", "$urlRouterProvider",
    function ($stateProvider, $urlRouterProvider)
    {
        $urlRouterProvider.otherwise("/login");

        $stateProvider
            .state("login", {
                url: "/login",
                template: "<user-login do-login='doLogin(username, password)'></user-login>",
                controller: "LoginController"
            })
            .state("main", {
                url: "/main",
                templateUrl: "templates/main.html",
                controller: "MainController"
            })
            .state("main.projects", {
                url: "/projects",
                templateUrl: "templates/projects.html",
                controller: "ProjectsController"
            })
            .state("main.projectProducts", {
                url: "/projects/{projectId}/products",
                templateUrl: "templates/products.html",
                controller: "ProductsController"
            })
            .state("main.projectMap", {
                url: "/projects/{projectId}/map",
                templateUrl: "templates/map.html",
                controller: "MapController"
            })
            .state("main.products", {
                url: "/products",
                templateUrl: "templates/products.html",
                controller: "ProductsController"
            })
            .state("main.productMap", {
                url: "/products/{productId}/map",
                templateUrl: "templates/map.html",
                controller: "MapController"
            });
    }
]);
