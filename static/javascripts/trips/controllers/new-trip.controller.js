/**
* NewtripController
* @namespace myapp.trips.controllers
*/
(function () {
  'use strict';

  angular
    .module('myapp.trips.controllers')
    .controller('NewTripController', NewTripController);

  NewTripController.$inject = ['$rootScope', '$scope', 'Authentication', 'Snackbar', 'Trips'];

  /**
  * @namespace NewTripController
  */
  function NewTripController($rootScope, $scope, Authentication, Snackbar, Trips) {
    var vm = this;

    vm.submit = submit;
    vm.countries = [];

    activate();

    /**
    * @name activate
    * @desc Actions to be performed when this controller is instantiated
    * @memberOf myapp.profiles.controllers.ProfileController
    */
    function activate() {
      Trips.countries().then(tripsSuccessFn, tripsErrorFn);


      /**
        * @name tripsSucessFn
        * @desc Update `trips` on viewmodel
        */
      function tripsSuccessFn(data, status, headers, config) {
        vm.countries = data.data;
      }


      /**
        * @name tripsErrorFn
        * @desc Show error snackbar
        */
      function tripsErrorFn(data, status, headers, config) {
        Snackbar.error(data.data.error);
      }
    }

    /**
    * @name submit
    * @desc Create a new trip
    * @memberOf myapp.trips.controllers.NewTripController
    */
    function submit() {
      $rootScope.$broadcast('trip.created', {
        name: vm.name,
        author: {
          username: Authentication.getAuthenticatedAccount().username
        },
        country: vm.country
      });

      $scope.closeThisDialog();

      Trips.create(vm.name, vm.country).then(createTripSuccessFn, createTripErrorFn);

      /**
      * @name createTripSuccessFn
      * @desc Show snackbar with success message
      */
      function createTripSuccessFn(data, status, headers, config) {
        Snackbar.show('Success! trip created.');
      }


      /**
      * @name createTripErrorFn
      * @desc Propogate error event and show snackbar with error message
      */
      function createTripErrorFn(data, status, headers, config) {
        $rootScope.$broadcast('trip.created.error');
        Snackbar.error(data.error);
      }
    }
  }
})();
