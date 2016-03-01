/**
* IndexController
* @namespace myapp.layout.controllers
*/
(function () {
  'use strict';

  angular
    .module('myapp.layout.controllers')
    .controller('IndexController', IndexController);

  IndexController.$inject = ['$scope', 'Feed', 'Snackbar', 'Authentication'];

  /**
  * @namespace IndexController
  */
  function IndexController($scope, Feed, Snackbar, Authentication) {
    var vm = this;

    vm.isAuthenticated = Authentication.isAuthenticated();
    vm.featured_collections = [];
    vm.posts = new Feed();
  }
})();
