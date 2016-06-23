(function() {

    var pongRoutesConfig = function($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('pong', {
                url: '/pong',
                templateUrl: '/g/pong',
                controller: 'PongCtrl',
                controllerAs: 'pongCtrl'
            });
    };

    angular
        .module('MainApp')
        .config(pongRoutesConfig);

}());