/**
 * Created by madongfang on 2016/9/1.
 */

appControllers = angular.module("appControllers", ["ui.router"]);

appControllers.controller("LoginController", ["$scope", "md5", "$state", "ApiLogin",
    function ($scope, md5, $state, ApiLogin) {
        $scope.doLogin = function (username, password) {
            ApiLogin.exec({username: username, password: md5.createHash(password)},
                function (response) {
                    $state.go("main.projects");
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

appControllers.controller("ManufacturersController", ["$scope", "ApiManufacturer",
    function ($scope, ApiManufacturer)
    {
        $scope.manufacturers = ApiManufacturer.query(
            function () {},
            function (response)
            {
                alert(response.data.returnMsg);
            }
        );

        $scope.deleteManufacturer = function (manufacturerId)
        {
            if (confirm("确定删除？"))
            {
                ApiManufacturer.delete({manufacturerId: manufacturerId},
                    function ()
                    {
                        location.reload();
                    },
                    function (response)
                    {
                        alert(response.data.returnMsg);
                    }
                );
            }
        };
    }
]);

appControllers.controller("ManufacturerConfigController", ["$scope", "$stateParams", "$state", "ApiManufacturer",
    function ($scope, $stateParams, $state, ApiManufacturer)
    {
        $scope.manufacturer = {name:""};

        var manufacturerId = $stateParams.manufacturerId;
        if (manufacturerId != 0)
        {
            $scope.manufacturer = ApiManufacturer.get({manufacturerId:manufacturerId},
                function () {},
                function (response) {
                    alert(response.data.returnMsg);
                }
            );
        }

        $scope.doConfig = function ()
        {
            if (manufacturerId == 0) // 新增
            {
                ApiManufacturer.create(null, $scope.manufacturer,
                    function ()
                    {
                        $state.go("main.manufacturers");
                    },
                    function (response) {
                        alert(response.data.returnMsg);
                    }
                );
            }
            else // 修改
            {
                $scope.manufacturer.$update(
                    function ()
                    {
                        $state.go("main.manufacturers");
                    },
                    function (response) {
                        alert(response.data.returnMsg);
                    }
                );
            }
        };
    }
]);

appControllers.controller("UsersController", ["$scope", "ApiUser",
    function ($scope, ApiUser)
    {
        $scope.users = ApiUser.query(
            function () {},
            function (response)
            {
                alert(response.data.returnMsg);
            }
        );

        $scope.deleteUser = function (userId)
        {
            if (confirm("确定删除？"))
            {
                ApiUser.delete({userId: userId},
                    function ()
                    {
                        location.reload();
                    },
                    function (response)
                    {
                        alert(response.data.returnMsg);
                    }
                );
            }
        };
    }
]);

appControllers.controller("UserConfigController", ["$scope", "$stateParams", "$state", "ApiUser", "md5",
    function ($scope, $stateParams, $state, ApiUser, md5)
    {
        $scope.user = {username:"", level:2};
        $scope.password = "";
        $scope.userLevelOptions = [{level:1, label:"1级"},{level:2, label:"2级"},{level:3, label:"3级"}];

        var userId = $stateParams.userId;
        if (userId != 0)
        {
            $scope.user = ApiUser.get({userId:userId},
                function () {},
                function (response) {
                    alert(response.data.returnMsg);
                }
            );
        }

        $scope.doConfig = function ()
        {
            $scope.user.password = md5.createHash($scope.password);
            if (userId == 0) // 新增
            {
                ApiUser.create(null, $scope.user,
                    function ()
                    {
                        $state.go("main.users");
                    },
                    function (response) {
                        alert(response.data.returnMsg);
                    }
                );
            }
            else // 修改
            {
                $scope.user.$update(
                    function ()
                    {
                        $state.go("main.users");
                    },
                    function (response) {
                        alert(response.data.returnMsg);
                    }
                );
            }
        };
    }
]);

appControllers.controller("MapController", ["$scope", "$stateParams", "ApiProduct",
    function ($scope, $stateParams, ApiProduct)
    {
        var map = new BMap.Map("bmap-container"); // 创建地图实例
        var initPoint = new BMap.Point(120.177, 30.28); // 创建点坐标,以杭州为中心
        map.centerAndZoom(initPoint, 14); // 初始化地图，设置中心点坐标和地图级别
        map.enableScrollWheelZoom();

        function addMarker(point, clickHandler)
        {
            var marker = new BMap.Marker(point);
            if (typeof clickHandler == "function")
            {
                marker.addEventListener("click", clickHandler);
            }

            map.addOverlay(marker);
        }

        function getProductInfoWindow(product)
        {
            var opts = {
                width: 200, // 信息窗口宽度
                height: 100, // 信息窗口高度
                title: product.model // 信息窗口标题
            };
            var content = "RFID: " + product.rfid
                + "<br>批次号: " + product.batchNumber;
            if (product.manufacturer != null)
            {
                content += ("<br>生产商: " + product.manufacturer.name);
            }
            if (product.project != null)
            {
                content += ("<br>项目名称: " + product.project.name);
            }

            return new BMap.InfoWindow(content, opts);
        }

        function addProductPoint(product)
        {
            if (product.longitude && product.latitude)
            {
                var point = new BMap.Point(product.longitude, product.latitude);
                addMarker(point, function ()
                {
                    ApiProduct.get({productId:product.id},
                        function (data)
                        {
                            map.openInfoWindow(getProductInfoWindow(data), point); //开启信息窗口
                        },
                        function (response)
                        {
                            alert(response.data.returnMsg);
                        }
                    );
                });
                return point;
            }
            else
            {
                return null;
            }
        }

        if ($stateParams.projectId)
        {
            ApiProduct.query({projectId:$stateParams.projectId},
                function (products)
                {
                    for (var i = 0; i < products.length; i++)
                    {
                        addProductPoint(products[i]);
                    }
                },
                function (response)
                {
                    alert(response.data.returnMsg);
                }
            );
        }
        else if ($stateParams.manufacturerId)
        {
            ApiProduct.query({manufacturerId:$stateParams.manufacturerId},
                function (products)
                {
                    for (var i = 0; i < products.length; i++)
                    {
                        addProductPoint(products[i]);
                    }
                },
                function (response)
                {
                    alert(response.data.returnMsg);
                }
            );
        }
        else if ($stateParams.productId)
        {
            ApiProduct.get({productId:$stateParams.productId},
                function (product)
                {
                    var point = addProductPoint(product);
                    if (point != null)
                    {
                        map.panTo(point); // 让地图平滑移动至新中心点，如果移动距离超过了当前地图区域大小，则地图会直跳到该点
                    }
                },
                function (response)
                {
                    alert(response.data.returnMsg);
                }
            );
        }
    }
]);
