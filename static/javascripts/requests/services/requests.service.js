/**
* requests
* @namespace myapp.requests.services
*/
(function () {
  'use strict';

  angular
    .module('myapp.requests.services')
    .factory('Requests', Requests);

  Requests.$inject = ['$http', 'localStorageService'];

  /**
  * @namespace Requests
  * @returns {Factory}
  */
  function Requests($http, localStorageService) {

    var Requests = {
      all: all,
      create: create,
    };

    return Requests;

    ////////////////////

    /**
    * @name all
    * @desc Get all Requests
    * @returns {Promise}
    * @memberOf myapp.requests.services.Requests
    */
    function all() {
      return $http.get('/api/v1/requests');
    }


    /**
    * @name create
    * @desc Create a new Requests
    * @param {string} content The content of the new Requests
    * @returns {Promise}
    * @memberOf myapp.requests.services.Requests
    */
     function create(origin, destination) {
      return $http({method: 'POST', url: '/api/v1/requests',
              headers: {
                'Authorization': 'Bearer facebook ' + localStorageService.get('token')
              },
              data: {
                'origin': origin,
                'destination': destination,
              }
              });
    };

  }
})();
