/*jslint node: true */
/*jslint nomen: true */
/*global angular, _, CalHeatMap, $*/
"use strict";

angular.module("myApp", [
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers'
]);

$(function() {

  $('.chain-calendar').each(function(index, chainCalendar) {
    var cal = new CalHeatMap();

    cal.init({
      itemSelector: chainCalendar,

      domain: "month",
      subDomain: "x_day",

      range: 3,

      cellSize: 20,
      cellPadding: 5,
      domainGutter: 20,

      start: new Date(2016, 0, 1),
      weekStartOnMonday: true,

      tooltip: false,
      subDomainTextFormat: "%d",

      displayLegend: true,
      legendVerticalPosition: "top",
      legendMargin: [0, 0, 20, 0],

      legendCellSize: 20,
      legendCellPadding: 5,
      legend: [1, 2, 3, 4],

      highlight: new Date(2016, 0, 1) // Highlight January 1st
    });
  });

});
