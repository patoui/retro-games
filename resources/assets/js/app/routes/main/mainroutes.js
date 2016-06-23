(function() {

    var mainRoutesConfig = function($stateProvider, $urlRouterProvider) {

        //Allow backend to handle redirects if not a valid conversations route.
        // If valid route but not handle by an existing state, redirect to 
        // /conversations/inbox/1 (page 1)
        $urlRouterProvider.otherwise(function($injector, $location) {            
            return '/i';
        });

        $stateProvider
            .state('index', {
                url: '/i',
                templateUrl: '/p/index',
                controller: 'IndexCtrl',
                controllerAs: 'indexCtrl'
            });
    };

    angular
        .module('MainApp')
        .config(mainRoutesConfig);

}());