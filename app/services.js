/**
 * Created by madongfang on 2016/9/1.
 */

var restfulApiService = angular.module("restfulApiService", ["ngResource"]);

restfulApiService.config(["$resourceProvider",
    function ($resourceProvider)
    {
        $resourceProvider.defaults.actions = {
            get: {method: 'GET', withCredentials: true},
            create: {method: 'POST', withCredentials: true},
            exec: {method: 'POST', withCredentials: true},
            query: {method: 'GET', isArray: true, withCredentials: true},
            update: {method: 'PUT', withCredentials: true},
            delete: {method: 'DELETE', withCredentials: true}
        };
    }
]);

restfulApiService.factory("ApiLogin", ["$resource",
    function ($resource) {
        return $resource(testServerAddr + "api/login");
    }
]);

restfulApiService.factory("ApiLogout", ["$resource",
    function ($resource) {
        return $resource(testServerAddr + "api/logout");
    }
]);

restfulApiService.factory("ApiProject", ["$resource",
    function ($resource) {
        return $resource(testServerAddr + "api/projects/:projectId", {projectId:"@id"}, null);
    }
]);

restfulApiService.factory("ApiProduct", ["$resource",
    function ($resource) {
        return $resource(testServerAddr + "api/products/:productId", {productId:"@id"}, null);
    }
]);

restfulApiService.factory("ApiManufacturer", ["$resource",
    function ($resource) {
        return $resource(testServerAddr + "api/manufacturers/:manufacturerId", {manufacturerId:"@id"}, null);
    }
]);
