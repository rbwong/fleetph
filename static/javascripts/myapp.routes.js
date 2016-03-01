(function () {
  'use strict';

  angular
    .module('myapp.routes')
    .config(config);

  config.$inject = ['$routeProvider'];

  /**
  * @name config
  * @desc Define valid application routes
  */
  function config($routeProvider) {
    $routeProvider.when('/', {
      controller: 'IndexController',
      controllerAs: 'vm',
      templateUrl: '/static/templates/layout/index.html',
    }).when('/trips/new', {
      templateUrl: '/static/templates/trips/new-trip.html',
    }).when('/requests/new', {
      controller: 'NewRequestController',
      controllerAs: 'vm',
      templateUrl: '/static/templates/requests/new-request.html',
    }).when('/trips', {
      controller: 'TripsController',
      controllerAs: 'vm',
      templateUrl: '/static/templates/trips/trips-view.html',
    }).when('/trips/:id', {
      controller: 'TripController',
      controllerAs: 'vm',
      templateUrl: '/static/templates/trips/trip-detail.html'
    }).when('/requests', {
      controller: 'RequestsController',
      controllerAs: 'vm',
      templateUrl: '/static/templates/requests/requests-view.html',
    }).otherwise('/');
  }
})();
