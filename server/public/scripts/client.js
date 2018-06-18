const timeApp = angular.module( 'timeApp', [ 'ngRoute', 'ngMaterial', 'ngMessages' ] );

timeApp.config( function ( $routeProvider ) {
    console.log( 'Route config loaded' );
    $routeProvider
        .when( '/', {
            redirectTo: '/add'
        })
        .when( '/add', {
            templateUrl: '/views/add.html',
            controller: 'TimeController as TC'
        })
        .when( '/manage', {
            templateUrl: '/views/manage.html',
            controller: 'TimeController as TC'
        })
        .otherwise( { template: '<h1>404</h1>' });
});