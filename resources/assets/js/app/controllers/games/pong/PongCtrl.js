(function () {

    var PongCtrl = function (
        $window,
        $state,
        $stateParams,
        $timeout,
        $mdSidenav
    ) {
        var self = this;

        self.init = function () {
            var stage = new createjs.Stage("demoCanvas");
            var paddleHeight = 60;
            var paddleWidth = 15;
            var canvasBorder = 10;

            //Ball
            var circle = new createjs.Shape();
            circle.graphics.beginFill("white").drawCircle(0, 0, 10);
            circle.x = 50;
            circle.y = 50;
            stage.addChild(circle);

            //Player 1 Paddle
            var paddle1 = new createjs.Shape();
            paddle1.graphics.beginFill("white").drawRect(10, 10, paddleWidth, paddleHeight);
            stage.addChild(paddle1);

            //Player 2 Paddle
            var paddle2 = new createjs.Shape();
            paddle2.graphics.beginFill("white").drawRect(475, 50, paddleWidth, paddleHeight);
            stage.addChild(paddle2);

            //Player 2 Paddle
            var paddle2 = new createjs.Shape();
            paddle2.graphics.beginFill("white").drawRect(245, 10, 10, 280);
            stage.addChild(paddle2);

            //Update canvas
            stage.update();
        };
    };

    angular
        .module('MainApp')
            .controller(
                'PongCtrl', 
                [
                    '$window',
                    '$state',
                    '$stateParams',
                    '$timeout',
                    '$mdSidenav',
                    PongCtrl
                ]
            );

}());