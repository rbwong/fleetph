/**
* requests
* @namespace myapp.requests.directives
*/
(function () {
  'use strict';

  angular
    .module('myapp.requests.directives')
    .directive('requests', requests);

  /**
  * @namespace requests
  */
  function requests() {
    /**
    * @name directive
    * @desc The directive to be returned
    * @memberOf myapp.requests.directives.requests
    */
    var directive = {
      restrict: 'E',
      scope: {
        requests: '='
      },
      templateUrl: '/static/templates/requests/requests.html'
    };

    return directive;
  }
})();
