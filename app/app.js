(function() {
    angular
        .module('chainApp', ['chainApp.calendar', 'chainApp.activities'])
        .controller('chainAppController', function() {
            this.data = [
                { name: 'Running 2 miles' },
                { name: 'Workout 10 min' }
            ];
        });
})();
