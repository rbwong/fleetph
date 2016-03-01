/**
* trips
* @namespace myapp.trips.services
*/
(function () {
  'use strict';

  angular
    .module('myapp.trips.services')
    .factory('Trips', Trips);

  Trips.$inject = ['$http', 'localStorageService'];

  /**
  * @namespace Trips
  * @returns {Factory}
  */
  function Trips($http, localStorageService) {

    var Trips = {
      all: all,
      create: create,
      get: get,
    };

    return Trips;

    ////////////////////

    /**
    * @name all
    * @desc Get all Trips
    * @returns {Promise}
    * @memberOf myapp.trips.services.Trips
    */
    function all() {
      return $http.get('/api/v1/trips');
    }

    /**
     * @name get
     * @desc Get the Trip
     * @param {string} id The id to get Trips for
     * @returns {Promise}
     * @memberOf myapp.trips.services.Trips
     */
    function get(id) {
      return $http.get('/api/v1/trips/' + id);
    }


    /**
    * @name create
    * @desc Create a new Trips
    * @param {string} content The content of the new Trips
    * @returns {Promise}
    * @memberOf myapp.trips.services.Trips
    */
     function create(name, country) {
      return $http({method: 'post', url: '/api/v1/trips',
              headers: {
                'Authorization': 'Bearer facebook ' + localStorageService.get('token')
              },
              data: {
                'name': name,
                'country': country,
              }
              });
    };

  }
})();
