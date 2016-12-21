'use strict';
/**
 *
 * Name of the App Module and Dependencies avalibles
 *
 **/
var app = angular.module('joy', ['ngRoute', 'ngResource', 'ngAnimate', 'ngTouch', 'oitozero.ngSweetAlert', 'ngDialog', 'ui.bootstrap', 'xs.ui.wizard', 'satellizer']);
app.value('XS_WIZARD_TEMPLATE_DIR', '/client/views/home'); // user configurable
app.directive('bootstrap', function() {
    return {
        controller: function($scope, $http, BootstrapResource) {
            var user;

            $scope.enable = false;

            $scope.Data = {
                success: false
            };
            $scope.Data = BootstrapResource.get({}, function() {
                if (!$scope.Data.success) {
                    window.location = '/auth/login';
                }
                user = $scope.Data.data;
                $scope.Data.data = null;
            });
            $scope.getUserName = function() {
                name = user.name;
                return name;
            }
            $scope.getRoleAccess = function() {
                access = user.access;
                return access;
            }
            $scope.miniSideBar = function() {
                var elementBody = angular.element(document.querySelector('#joyApp'));
                $scope.enable = true;
                elementBody.addClass('sidebar-collapse');
            };
            $scope.openSideBar = function() {
                var elementBody = angular.element(document.querySelector('#joyApp'));
                $scope.enable = true;
                elementBody.addClass('sidebar-open');
            };
            $scope.normalSideBar = function() {
                var elementBody = angular.element(document.querySelector('#joyApp'));
                $scope.enable = false;
                elementBody.removeClass('sidebar-collapse');
            };
            $scope.closeSideBar = function() {
                var elementBody = angular.element(document.querySelector('#joyApp'));
                $scope.enable = false;
                elementBody.removeClass('sidebar-open');
            };
        }
    };
}).directive('datapaginator', function() {
    return {
        url: '=a',
        controller: function($scope, $http, SweetAlert) {
            $scope.model = [];
            $scope.lastpage = 1;
            $scope.getModelData = function() {
                $http({
                    url: $scope.url,
                    method: "GET",
                    params: {
                        page: $scope.currentpage || 1
                    }
                }).success(function(data, status, headers, config) {
                    if ($scope.currentpage > data.last_page) {
                        $scope.currentpage = data.last_page;
                        $scope.getModelData();
                    }
                    $scope.currentpage = data.current_page;
                    $scope.lastpage = data.last_page;
                    $scope.generatePages(data.last_page);
                    $scope.model = data.data;
                }).error(function(data) {
                    $scope.model = data.error;
                    SweetAlert.swal("Error!", $scope.model, "error");
                });
            };
            $scope.generatePages = function(total) {
                $scope.Pages = [];
                for (var i = 1; i <= total; i++) {
                    $scope.Pages.push({
                        number: i
                    });
                }
            };
            $scope.isCurrentPage = function(page) {
                return $scope.currentpage == page;
            };
            $scope.loadPage = function(page) {
                $scope.currentpage = page;
                $scope.getModelData();
            };
            $scope.loadFirst = function() {
                $scope.loadPage(1);
            };
            $scope.loadLast = function() {
                $scope.loadPage($scope.lastpage);
            };
            $scope.loadNext = function() {
                $scope.loadPage($scope.currentpage + 1);
            };
            $scope.loadPrev = function() {
                $scope.loadPage($scope.currentpage - 1);
            };
            $scope.getModelData();

            $scope.getDate = function(ca) {
                return new Date(ca);
            };
        },
        template: '<nav class="text-center" ng-show="(lastpage > 1)"><ul class="pagination"><li><button class="btn btn-default" aria-label="First"  ng-disabled="(currentpage == 1)" ng-click="loadFirst()">First</button>&nbsp;&nbsp;<button class="btn btn-default" aria-label="Previous" ng-disabled="(currentpage == 1)" ng-click="loadPrev()"><i class="fa fa-chevron-left"></i></button></li><li ng-repeat="Page in Pages">&nbsp;<button class="btn btn-default" ng-disabled="(isCurrentPage(Page.number))" ng-click="loadPage(Page.number)">{{Page.number}}</button></li><li>&nbsp;<button class="btn btn-default" aria-label="Next" ng-disabled="(currentpage == lastpage)" ng-click="loadNext()"><i class="fa fa-chevron-right"></i></button>&nbsp;&nbsp;<button class="btn btn-default" aria-label="Last" ng-disabled="(currentpage == lastpage)" ng-click="loadLast()">Last</button></li></ul></nav>'
    };
});