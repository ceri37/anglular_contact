
require.config({
    paths: {
        angular: '../vendor/js/angular',
        angularRoute: '../vendor/js/angular-route',
        text: '../vendor/js/require.text'
    },
    shim: {
        angular: {
            exports: 'angular'
        },
        angularRoute: {
            deps: [ 'angular' ]
        }
    }
});

require([
    'angular',
    'app',
    'angularRoute',
    'controllers/list',
    'controllers/form'
], function (angular, app) {

    // routes

    app.config([
        '$routeProvider',
        function($routeProvider) {

            $routeProvider
                .when("/", {
                    controller: 'ListController',
                    templateUrl: 'partials/list.html'
                })
                .when("/add", {
                    controller: 'FormController',
                    templateUrl: 'partials/form.html'
                })
                .when("/edit/:id", {
                    controller: 'FormController',
                    templateUrl: 'partials/form.html'
                })
                .otherwise({
                    redirectTo: "/"
                });

        }
    ]);

    // staring application

    angular.bootstrap(
        document,
        [ 'contacts' ]
    );

});