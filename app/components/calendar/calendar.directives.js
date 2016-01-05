
var calendarDirective = function() {
    return {
        restrict: 'E',
        templateUrl: 'app/templates/calendar.html',
        controller: function () {
            alert('controller');
            console.log('controller');
        },
        link: function (scope, element, attributes, controller) {
            log('link');
            alert('link');
        }
    };
};

angular.module('calendar')
    .directive('calendar', calendarDirective);
