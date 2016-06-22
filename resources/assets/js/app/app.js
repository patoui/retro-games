(function () {

    var app = angular.module('MainApp',
        [
            'ui.router',
            'ngMaterial',
            'ngAnimate',
            'ngSanitize',
        ]
    );

    var appConfig = function($locationProvider) {

        $locationProvider.html5Mode(
            {
                enabled: true,
                requireBase: false
            }
        );

    };

    angular
        .module('MainApp')
        .config(appConfig);

}());