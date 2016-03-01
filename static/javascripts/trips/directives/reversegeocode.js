/**
* trip
* @namespace myapp.trip.directives
*/
(function() {
	'use strict';

angular
	.module('myapp.trips.directives')
	.directive('reverseGeocode', reverseGeocode);

/**
* @namespace trip
*/
function reverseGeocode() {
        return {
            restrict: 'E',
            template: '',
            link: function (scope, element, attrs) {
                var origin = attrs.longlat.split(',')[0];
                var destination = attrs.longlat.split(',')[1];
                var geocoder = new google.maps.Geocoder();
                var latlng = new google.maps.LatLng(origin, destination);
                geocoder.geocode({ 'latLng': latlng }, function (results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                        if (results[0]) {
                            element.text(results[0].formatted_address);
                        } else {
                            element.text('Location not found');
                        }
                    } else {
                        element.text(origin + ', ' + destination);
                    }
                });
            },
            replace: false
        }
}
})();