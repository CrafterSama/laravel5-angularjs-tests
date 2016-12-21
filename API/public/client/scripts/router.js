'use strict';

app.config(function($routeProvider) {
    $routeProvider
        .when('/companies', {
            templateUrl: 'views/companies/index.html',
            controller: 'ListCompanyCtrl'
        })
        .when('/companies/new', {
            templateUrl: 'views/companies/create.html',
            controller: 'CreateCompanyCtrl'
        })
        .when('/companies/:id', {
            templateUrl: 'views/companies/profile.html',
            controller: 'ProfileCompanyCtrl'
        })
        .when('/companies/edit/:id', {
            templateUrl: 'views/companies/create.html',
            controller: 'EditCompanyCtrl'
        })
        .when('/courses', {
            templateUrl: 'views/courses/index.html',
            controller: 'ListCourseCtrl'
        })
        .when('/courses/new', {
            templateUrl: 'views/courses/create.html',
            controller: 'CreateCourseCtrl'
        })
        .when('/courses/edit/:id', {
            templateUrl: 'views/courses/create.html',
            controller: 'EditCourseCtrl'
        })
        .when('/clients', {
            templateUrl: 'views/clients/index.html',
            controller: 'ListClientCtrl'
        })
        .when('/clients/new', {
            templateUrl: 'views/clients/create.html',
            controller: 'CreateClientCtrl'
        })
        .when('/clients/edit/:id', {
            templateUrl: 'views/clients/create.html',
            controller: 'EditClientCtrl'
        })
        .when('/signers', {
            templateUrl: 'views/signers/index.html',
            controller: 'ListSignerCtrl'
        })
        .when('/signers/new', {
            templateUrl: 'views/signers/create.html',
            controller: 'CreateSignerCtrl'
        })
        .when('/signers/edit/:id', {
            templateUrl: 'views/signers/create.html',
            controller: 'EditSignerCtrl'
        })
        .when('/attendants', {
            templateUrl: 'views/attendants/index.html',
            controller: 'ListAttendantCtrl'
        })
        .when('/attendants/new', {
            templateUrl: 'views/attendants/create.html',
            controller: 'CreateAttendantCtrl'
        })
        .when('/attendants/edit/:id', {
            templateUrl: 'views/attendants/create.html',
            controller: 'EditAttendantCtrl'
        })
        .when('/users', {
            templateUrl: 'views/users/index.html',
            controller: 'ListUserCtrl'
        })
        .when('/users/:id', {
            templateUrl: 'views/users/profile.html',
            controller: 'ProfileUserCtrl'
        })
        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'HomeCtrl'
        })
        .otherwise({
            redirectTo: '/error',
            templateUrl: 'views/404.html'
        });
});