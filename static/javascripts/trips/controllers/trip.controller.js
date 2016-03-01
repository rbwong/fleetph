/**
* TripController
* @namespace myapp.trips.controllers
*/
(function () {
  'use strict';

  angular
    .module('myapp.trips.controllers')
    .controller('TripController', TripController);

  TripController.$inject = ['$scope', '$routeParams', 'Trips', 'Snackbar', 'Authentication', 'googleDirections'];

  /**
  * @namespace TripController
  */
  function TripController($scope, $routeParams, Trips, Snackbar, Authentication, googleDirections) {
    var vm = this;

    vm.isAuthenticated = Authentication.isAuthenticated();
    vm.trip = undefined;
    activate();

    /**
    * @name activate
    * @desc Actions to be performed when this controller is instantiated
    * @memberOf myapp.trips.controllers.ProfileController
    */
    function activate() {
      var id = $routeParams.id;
      Trips.get(id).then(tripsuccessFn, profileErrorFn);

      /**
      * @name tripsuccessProfile
      */
      function tripsuccessFn(data, status, headers, config) {
        vm.trip = data.data;
        var request = {
          origin: data.data.origin,
          destination: data.data.destination,
          travelMode: 'transit'
        };

        googleDirections.getDirections(request).then(function(directions) {
          var longLats = [];
          var waypoints = directions.routes[0].overview_path;
          $(waypoints).each(function(index, item) {
            longLats.push([item.k, item.D]);
          });
            data.data.waypoints = longLats;
        });

        var long_ = data.data.origin.split(',')[0];
        var lat_ = data.data.origin.split(',')[1];
        var geocoder = new google.maps.Geocoder();
        var latlng = new google.maps.LatLng(long_, lat_);
        geocoder.geocode({ 'latLng': latlng }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                if (results[0]) {
                    data.data.origin_str = results[0].formatted_address;
                };
            };
        });

        var long__ = data.data.destination.split(',')[0];
        var lat__ = data.data.destination.split(',')[1];
        var geocoder = new google.maps.Geocoder();
        var latlng = new google.maps.LatLng(long__, lat__);
        geocoder.geocode({ 'latLng': latlng }, function (results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
                if (results[0]) {
                    data.data.destination_str = results[0].formatted_address;
                };
            };
        });
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
