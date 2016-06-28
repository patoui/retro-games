(function () {

    var app = angular.module('MainApp');

    var pongCanvas = function ($window) {
        return {
            restrict: 'EAC',
            replace: true,
            transclude: true,
            template:
            '<canvas width="500" height="300" style="background-color:black;">' +
            '</canvas>',
            link: function (scope, element, attrs) {
                // Global vars
                var w,
                    f,
                    loader,
                    canvasBorder,
                    ball,
                    ballXPosition,
                    ballYPosition,
                    paddleWidth,
                    paddleHeight,
                    paddle1,
                    paddle1XPosition,
                    paddle1YPosition,
                    paddle2,
                    paddle2XPosition,
                    paddle2YPosition;

                var movementDistance = 10;

                var handlePaddle1Up = function () {
                    paddle1.y = paddle1.y - movementDistance;
                    scope.stage.update(event);
                };

                var handlePaddle1Down = function (event) {
                    paddle1.y = paddle1.y + movementDistance
;                    scope.stage.update(event);
                };

                var handlePaddle2Up = function () {
                    paddle2.y = paddle2.y - movementDistance;
                    scope.stage.update(event);
                };

                var handlePaddle2Down = function () {
                    paddle2.y = paddle2.y + movementDistance;
                    scope.stage.update(event);
                };

                // CONTROLS
                var key = [];
                var controls = function(e) {
                    e = e || event; // to deal with IE
                    key[e.keyCode] = e.type == 'keydown';
                    if (key[87] && key[38]) {
                        // W/Up same time
                        handlePaddle1Up();
                        handlePaddle2Up();
                    } else if (key[87] && key[40]) {
                        // W/Down same time
                        handlePaddle1Up();
                        handlePaddle2Down();
                    } else if (key[83] && key[38]) {
                        // S/Up same time
                        handlePaddle1Down();
                        handlePaddle2Up();
                    } else if (key[83] && key[40]) {
                        // S/Down same time
                        handlePaddle1Down();
                        handlePaddle2Down();
                    } else if (key[87]) {
                        // W
                        handlePaddle1Up();
                    } else if (key[38]) {
                        // Up
                        handlePaddle2Up();
                    } else if (key[83]) {
                        // S
                        handlePaddle1Down();
                    } else if (key[40]) {
                        // Down
                        handlePaddle2Down();
                    }
                };

                var handleComplete = function () {
                    window.onkeydown = window.onkeyup = controls;
                };

                var drawGame = function () {
                    // TODO Need something to determine aspect ratio
                    if (scope.stage) {
                        scope.stage.autoClear = true;
                        scope.stage.removeAllChildren();
                        scope.stage.update();
                    } else {
                        scope.stage = new createjs.Stage(element[0]);
                        // TODO Fix this non-sense...
                        // 32 for padding both sides
                        // 72 for nav bar height
                        // Should be size of parent container
                        scope.stage.canvas.width = $window.innerWidth - 32;
                        scope.stage.canvas.height = $window.innerHeight - 32 - 72;
                        w = scope.stage.canvas.width;
                        h = scope.stage.canvas.height;
                        //Load assets here
                        loader = new createjs.LoadQueue(false);
                        handleComplete();
                        // loader.addEventListener("complete", handleComplete);
                        // loaderSvc.getLoader().addEventListener("complete", handleComplete);
                        // loaderSvc.loadAssets();
                    }

                    //Game Vars
                    canvasBorder = 10;

                    //Ball
                    ballXPosition = 50;
                    ballYPosition = 50;
                    ball = new createjs.Shape();
                    ball.graphics.beginFill("white").drawCircle(0, 0, 10);
                    ball.x = ballXPosition;
                    ball.y = ballYPosition;
                    scope.stage.addChild(ball);

                    //Paddle Vars
                    paddleHeight = 60;
                    paddleWidth = 15;

                    //Paddle 1 Paddle
                    paddle1XPosition = canvasBorder;
                    paddle1YPosition = canvasBorder;
                    paddle1 = new createjs.Shape();
                    paddle1.graphics.beginFill("white")
                        .drawRect(
                            paddle1XPosition,
                            paddle1YPosition,
                            paddleWidth,
                            paddleHeight
                        );
                    scope.stage.addChild(paddle1);

                    //Paddle 2 Paddle
                    paddle2XPosition = w - canvasBorder - paddleWidth;
                    paddle2YPosition = canvasBorder;
                    paddle2 = new createjs.Shape();
                    paddle2.graphics.beginFill("white")
                        .drawRect(
                            paddle2XPosition,
                            paddle2YPosition,
                            paddleWidth,
                            paddleHeight
                        );
                    scope.stage.addChild(paddle2);

                    //Center Line
                    centerLineXPosition = w / 2 + canvasBorder / 2;
                    centerLineYPosition = canvasBorder;
                    centerLineHeight = h - canvasBorder * 2;
                    centerLine = new createjs.Shape();
                    centerLine.graphics.beginFill("white")
                        .drawRect(
                            centerLineXPosition,
                            centerLineYPosition,
                            10,
                            centerLineHeight
                        );
                    scope.stage.addChild(centerLine);

                    //Update canvas
                    scope.stage.update();
                };
                drawGame();

                //Resize canvas
                angular.element($window).bind(
                    'resize',
                    function () {
                        drawGame();
                        scope.$digest();
                    }
                );
            }
        }
    };

    app.directive('pongCanvas', ['$window', pongCanvas]);

}());
