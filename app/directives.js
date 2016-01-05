/*jslint node: true */
/*global angular, alert, CalHeatMap, log */
"use strict";

var calendar = angular.module('calendar', []);

calendar.directive('calendar', function () {
    return {
        restrict: 'E',
        templateUrl: 'app/templates/calendar.html',
        controller: function () {
            alert('controller');
            console.log('controller');
        },
        link: function ($scope, $element, $attributes, controller) {
            log('link');
            alert('link');

    };
});
