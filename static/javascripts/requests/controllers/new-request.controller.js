/**
* NewRequestController
* @namespace myapp.requests.controllers
*/
(function () {
  'use strict';

  angular
    .module('myapp.requests.controllers')
    .controller('NewRequestController', NewRequestController);

  NewRequestController.$inject = ['$rootScope', '$scope', 'Authentication', 'Snackbar', 'Requests', 'geolocation', 'GeoCoder'];

  /**
  * @namespace NewRequestController
  */
  function NewRequestController($rootScope, $scope, Authentication, Snackbar, Requests, geolocation, GeoCoder) {
    var vm = this;

    vm.submit = submit;

    vm.requests = undefined;
    activate();

    /**
    * @name activate
    * @desc Actions to be performed when this controller is instantiated
    * @memberOf myapp.requests.controllers.ProfileController
    */
    function activate() {
      geolocation.getLocation().then(function(data){
        vm.coords_origin = {lat:data.coords.latitude, long:data.coords.longitude};
      });
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

    /**
    * @name submit
    * @desc Create a new request
    * @memberOf myapp.requests.controllers.NewRequestController
    */
    function submit() {
      $rootScope.$broadcast('request.created', {
        origin: vm.coords_origin.lat + ',' + vm.coords_origin.long,
        destination: vm.destination,
        owner: {
          username: Authentication.getAuthenticatedAccount().username
        },
      });

      GeoCoder.geocode({address: vm.destination}).then(function(result) {
        vm.coords_destination = {lat:result[0].geometry.location.k, long:result[0].geometry.location.D};
        Requests.create(vm.coords_origin.lat + ',' + vm.coords_origin.long, vm.coords_destination.lat + ',' + vm.coords_destination.long).then(createRequestSuccessFn, createRequestErrorFn);

        /**
        * @name createrequestSuccessFn
        * @desc Show snackbar with success message
        */
        function createRequestSuccessFn(data, status, headers, config) {
          Snackbar.show('Success! request created.');
        }


        /**
        * @name createRequestErrorFn
        * @desc Propogate error event and show snackbar with error message
        */
        function createRequestErrorFn(data, status, headers, config) {
          $rootScope.$broadcast('request.created.error');
          Snackbar.error(data.error);
        }
      });
    }
  }
})();
