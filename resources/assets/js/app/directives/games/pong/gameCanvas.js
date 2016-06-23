(function () {

    var app = angular.module('MainApp');

    var gameCanvas = function () {
        return {
            restrict: 'E',
            scope: false,
            template:
            '<canvas></canvas>'
        }
    };

    app.directive('gameCanvas', gameCanvas);

}());
