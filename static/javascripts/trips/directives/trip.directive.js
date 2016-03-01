/**
* trip
* @namespace myapp.trip.directives
*/
(function () {
  'use strict';

  angular
    .module('myapp.trips.directives')
    .directive('trip', trip);

  /**
  * @namespace trip
  */
  function trip() {
    /**
    * @name directive
    * @desc The directive to be returned
    * @memberOf myapp.trip.directives.trip
    */
    var directive = {
      restrict: 'E',
      scope: {
        trip: '='
      },
      templateUrl: '/static/templates/trips/trip.html'
    };

    return directive;
  }
})();
