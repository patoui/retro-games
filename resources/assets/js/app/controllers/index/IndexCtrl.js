(function () {

    var IndexController = function (
        $window,
        $state,
        $stateParams,
        $timeout,
        $mdSidenav
    ) {
        var ctrl = this;

        var onMessageBox = function (data) {
            ctrl.participantMessages = data.data;
            ctrl.isDataLoaded = true;
        };

        var onParticipant = function (data) {
            ctrl.participant = data;
            ctrl.isDataLoaded = true;
        };

        var onError = function(reason) {
            ctrl.error = 'Could not fetch the data.';
        };

        ctrl.fetchInbox = function(page) {
            ctrl.stateChanger();
        };

        ctrl.fetchParticipant = function(participantId) {
            participantService.getParticipant(participantId)
                .then(onParticipant, onError);
        };
    };

    angular
        .module('MainApp')
            .controller(
                'IndexController', 
                [
                    '$window',
                    '$state',
                    '$stateParams',
                    '$timeout',
                    '$mdSidenav',
                    IndexController
                ]
            );

}());