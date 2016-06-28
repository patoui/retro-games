(function () {

    var app = angular.module('MainApp');

    var gameCanvas = function () {
        return {
            restrict: 'EAC',
            replace: true,
            scope: false,
            transclude: true,
            template:
            '<canvas id="newCanvas" width="{{ mainCtrl.width }}" height="{{ mainCtrl.height }}" style="background-color:black;">' +
            '</canvas>',
            link: function (scope, element, attrs) {
                // console.log(stateProvider);
                // if (scope.stage) {
                //     scope.mainCtrl.stage.autoClear = true;
                //     scope.mainCtrl.stage.removeAllChildren();
                //     scope.mainCtrl.stage.update();
                // } else {
                //     scope.mainCtrl.stage = new createjs.Stage(element[0]);
                // }
                scope.mainCtrl.width = 500;
                scope.mainCtrl.height = 300;
                scope.mainCtrl.isLoaded = false;
                // console.log(scope.mainCtrl.stage);
                // scope.mainCtrl.stage = new createjs.Stage(element[0]);
                // scope.pongCtrl.init(scope.mainCtrl.stage);
            }
        }
    };

    app.directive('gameCanvas', gameCanvas);

}());
