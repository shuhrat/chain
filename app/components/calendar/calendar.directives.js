(function() {
    var calendarDirective = function() {
        return {
            restrict: 'E',
            templateUrl: 'app/components/calendar/views/calendar.html',
            // controllerAs: 'calendar',
            controller: function() {
                this.getCalendarOptions = function() {
                    return {
                        domain: 'month',
                        subDomain: 'x_day',

                        range: 3,

                        cellSize: 20,
                        cellPadding: 5,
                        domainGutter: 20,

                        start: new Date(2016, 0, 1),
                        weekStartOnMonday: true,

                        tooltip: false,
                        subDomainTextFormat: '%d',

                        displayLegend: true,
                        legendVerticalPosition: 'top',
                        legendMargin: [0, 0, 20, 0],

                        legendCellSize: 20,
                        legendCellPadding: 5,
                        legend: [1, 2, 3, 4]
                    };
                };
            },
            link: function postLink(scope, element, attributes, controller) {
                var cal = new CalHeatMap(),
                    calOptions = controller.getCalendarOptions();

                calOptions.itemSelector = '.chain-calendar';
                cal.init(calOptions);
            }
        };
    };

    angular
        .module('chainApp.calendar')
        .directive('calendar', calendarDirective);
})();
