/**
 * Created by madongfang on 2016/9/1.
 */

var userLogin = angular.module("userLogin", []);

userLogin.directive("userLogin", function () {
        return {
            restrict: "E",
            replace: true,
            scope: {doLogin: "&"},
            templateUrl: "modules/user-login/user-login.template.html",
            link: function (scope, element, attrs) {
                element.find("input")[0].focus();

                scope.username = "";
                scope.password = "";
                scope.login = function () {
                    if (scope.username === "")
                    {
                        alert("请输入用户名");
                        element.find("input")[0].focus();
                        return;
                    }
                    if (scope.password === "")
                    {
                        alert("请输入验证码");
                        element.find("input")[1].focus();
                        return;
                    }

                    scope.doLogin({username:scope.username, password:scope.password});

                    scope.password = "";
                };
            }
        };
    }
);