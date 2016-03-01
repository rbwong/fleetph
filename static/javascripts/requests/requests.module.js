(function () {
  'use strict';

  angular
    .module('myapp.requests', [
      'myapp.requests.controllers',
      'myapp.requests.directives',
      'myapp.requests.services',
      'infinite-scroll',
      'relativeDate'
    ]);

  angular
    .module('myapp.requests.controllers', ['geolocation']);

  angular
    .module('myapp.requests.directives', ['ngDialog']);

  angular
    .module('myapp.requests.services', ['LocalStorageModule']);
})();
