/**
 * Created by madongfang on 2016/9/1.
 */

appControllers = angular.module("appControllers", ["ui.router"]);

appControllers.controller("LoginController", ["$scope", "md5", "$state", "ApiLogin",
    function ($scope, md5, $state, ApiLogin) {
        $scope.doLogin = function (username, password) {
            ApiLogin.exec({username: username, password: md5.createHash(password)},
                function (response) {
                    $state.go("main");
                },
                function (response) {
                    alert(response.data.returnMsg);
                }
            );
        };
    }
]);

appControllers.controller("MainController", ["$scope", "$state", "ApiLogout",
    function ($scope, $state, ApiLogout, ApiMine) {
        $scope.doLogout = function () {
            ApiLogout.exec();
        };
    }
]);

appControllers.controller("ProjectsController", ["$scope", "ApiProject",
    function ($scope, ApiProject)
    {
        $scope.size = 100; // 每页的记录数
        $scope.currentPage = 1; // 当前页,从1开始

        $scope.pageChanged = function ()
        {
            ApiProject.get(
                {
                    size: $scope.size,
                    page: $scope.currentPage - 1
                },
                function (data)
                {
                    $scope.totalItems = data.totalElements; // 总记录数
                    $scope.projects = data.content;
                },
                function (response)
                {
                    alert(response.data.returnMsg);
                }
            );
        };

        $scope.pageChanged();

    }
]);

appControllers.controller("ProductsController", ["$scope", "$stateParams", "ApiProduct",
    function ($scope, $stateParams, ApiProduct)
    {
        $scope.size = 100; // 每页的记录数
        $scope.currentPage = 1; // 当前页,从1开始

        $scope.pageChanged = function ()
        {
            ApiProduct.get(
                {
                    size: $scope.size,
                    page: $scope.currentPage - 1,
                    projectId: $stateParams.projectId
                },
                function (data)
                {
                    $scope.totalItems = data.totalElements; // 总记录数
                    $scope.products = data.content;
                },
                function (response)
                {
                    alert(response.data.returnMsg);
                }
            );
        };

        $scope.pageChanged();

    }
]);
