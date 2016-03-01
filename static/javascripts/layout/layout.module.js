(function () {
  'use strict';

  angular
    .module('myapp.layout', [
      'myapp.layout.controllers',
    ]);

  angular
    .module('myapp.layout.controllers', ['facebook', 'geolocation']);
})();
