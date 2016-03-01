/**
* TripsController
* @namespace myapp.trips.controllers
*/
(function () {
  'use strict';

  angular
    .module('myapp.trips.controllers')
    .controller('TripsController', TripsController);

  TripsController.$inject = ['$scope', 'Trips', 'Snackbar', 'Authentication'];

  /**
  * @namespace TripsController
  */
  function TripsController($scope, Trips, Snackbar, Authentication) {
    var vm = this;

    vm.isAuthenticated = Authentication.isAuthenticated();
    vm.trips = undefined;
    activate();

    /**
    * @name activate
    * @desc Actions to be performed when this controller is instantiated
    * @memberOf myapp.trips.controllers.ProfileController
    */
    function activate() {
      Trips.all().then(tripsuccessFn, profileErrorFn);

      /**
      * @name tripsuccessProfile
      */
      function tripsuccessFn(data, status, headers, config) {
        vm.trips = data.data;
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
