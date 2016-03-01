/**
* trips
* @namespace myapp.trips.directives
*/
(function () {
  'use strict';

  angular
    .module('myapp.trips.directives')
    .directive('trips', trips);

  /**
  * @namespace trips
  */
  function trips() {
    /**
    * @name directive
    * @desc The directive to be returned
    * @memberOf myapp.trips.directives.trips
    */
    var directive = {
      restrict: 'E',
      scope: {
        trips: '='
      },
      templateUrl: '/static/templates/trips/trips.html'
    };

    return directive;
  }
})();
