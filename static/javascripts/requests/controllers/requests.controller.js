/**
* RequestsController
* @namespace myapp.requests.controllers
*/
(function () {
  'use strict';

  angular
    .module('myapp.requests.controllers')
    .controller('RequestsController', RequestsController);

  RequestsController.$inject = ['$scope', 'Requests', 'Snackbar', 'Authentication'];

  /**
  * @namespace RequestsController
  */
  function RequestsController($scope, Requests, Snackbar, Authentication) {
    var vm = this;

    vm.isAuthenticated = Authentication.isAuthenticated();
    vm.requests = undefined;
    activate();

    /**
    * @name activate
    * @desc Actions to be performed when this controller is instantiated
    * @memberOf myapp.requests.controllers.ProfileController
    */
    function activate() {
      Requests.all().then(requestsuccessFn, profileErrorFn);

      /**
      * @name requestsuccessProfile
      */
      function requestsuccessFn(data, status, headers, config) {
        vm.requests = data.data;
      }


      /**
      * @name profileErrorFn
      * @desc Redirect to index and show error Snackbar
      */
      function profileErrorFn(data, status, headers, config) {
        $location.url('/');
        Snackbar.error('That user does not exist.');
      }
    }
  }
})();
