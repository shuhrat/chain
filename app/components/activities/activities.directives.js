(function() {
    var activityDirective = function() {
            var uniqueId = 1;

            return {
                restrict: 'E',
                scope: {
                    blockId: '@'
                },
                templateUrl: 'app/components/activities/views/activity.html',
                link: function postLink(scope, element) {
                    var itemId = 'item_' + uniqueId++;

                    element.find('input').attr('id', itemId);
                    element.find('label').attr('for', itemId);
                }
            };
        },
        activitiesDirective = function() {
            return {
                restrict: 'E',
                templateUrl: 'app/components/activities/views/activities.html'
            };
        };

    angular
        .module('chainApp.activities')
        .directive('activity', activityDirective)
        .directive('activities', activitiesDirective);
})();
