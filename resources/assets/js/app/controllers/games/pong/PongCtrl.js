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
        self.paddle1Score = 0;
        self.paddle2Score = 0;

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