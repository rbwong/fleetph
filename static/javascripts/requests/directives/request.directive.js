/**
* request
* @namespace myapp.request.directives
*/
(function () {
  'use strict';

  angular
    .module('myapp.requests.directives')
    .directive('request', request);

  /**
  * @namespace request
  */
  function request() {
    /**
    * @name directive
    * @desc The directive to be returned
    * @memberOf myapp.request.directives.request
    */
    var directive = {
      restrict: 'E',
      scope: {
        request: '='
      },
      templateUrl: '/static/templates/requests/request.html'
    };

    return directive;
  }
})();
