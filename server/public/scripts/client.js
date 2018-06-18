const timeApp = angular.module( 'timeApp', [ 'ngRoute', 'ngMaterial', 'ngMessages' ] );

timeApp.config( function ( $routeProvider ) {
    console.log( 'Route config loaded' );
    $routeProvider
        .when( '/', {
            redirectTo: '/add'
        })
        .when( '/add', {
            templateUrl: '/views/add.html',
            controller: 'AddController as AC'
        })
        .when( '/manage', {
            templateUrl: '/views/manage.html',
            controller: 'AddController as AC'
        })
        .otherwise( { template: '<h1>404</h1>' });
});