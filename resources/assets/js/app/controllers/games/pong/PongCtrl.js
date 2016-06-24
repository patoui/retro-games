(function () {

    var PongCtrl = function (
        $scope,
        $window,
        $state,
        $stateParams,
        $timeout,
        $mdSidenav
    ) {
        var self = this;

        self.init = function () {
            //
        };
    };

    angular
        .module('MainApp')
            .controller(
                'PongCtrl', 
                [
                    '$scope',
                    '$window',
                    '$state',
                    '$stateParams',
                    '$timeout',
                    '$mdSidenav',
                    PongCtrl
                ]
            );

}());