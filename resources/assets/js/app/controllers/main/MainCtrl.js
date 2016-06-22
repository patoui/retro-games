(function () {

    var MainCtrl = function (
        $window,
        $state,
        $stateParams,
        $timeout,
        $mdSidenav
    ) {
        var self = this;
        self.toggleLeft = buildDelayedToggler('left');

        self.openMenu = function($mdOpenMenu, ev) {
        originatorEv = ev;
        $mdOpenMenu(ev);
        };

        self.close = function () {
            $mdSidenav('left').close()
                .then(function () {
                    //close LEFT is done
                });
        };

        /**
        * Supplies a function that will continue to operate until the
        * time is up.
        */
        function debounce(func, wait, context) {
            var timer;
            return function debounced() {
                var context = self,
                    args = Array.prototype.slice.call(arguments);
                $timeout.cancel(timer);
                timer = $timeout(function() {
                    timer = undefined;
                    func.apply(context, args);
                }, wait || 10);
            };
        }
        /**
        * Build handler to open/close a SideNav; when animation finishes
        * report completion in console
        */
        function buildDelayedToggler(navID) {
            return debounce(function() {
            $mdSidenav(navID)
                .toggle()
                .then(function () {
                    //toggle is done
                });
            }, 200);
        }
    };

    angular
        .module('MainApp')
            .controller(
                'MainCtrl', 
                [
                    '$window',
                    '$state',
                    '$stateParams',
                    '$timeout',
                    '$mdSidenav',
                    MainCtrl
                ]
            );

}());