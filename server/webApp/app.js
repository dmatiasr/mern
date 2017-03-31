var app = angular.module("app",['ngRoute']);

  app.config(function ($routeProvider){

    $routeProvider
      .when('/users',{
        templateUrl : './views/users.html',
        controller : 'UserController'
      })
      .when('/login',{
        templateUrl : './views/login.html',
        controller : 'UserController'
      })
      .when('/home',{
        templateUrl : './views/home.html',
        controller : 'HomeController'
      })
      .when('/register',{
        templateUrl : './views/register.html',
        controller : 'UserController'
      })
      .otherwise({
        redirectTo: './'
      });
});
