(function () {

    var app = angular.module('MainApp');

    var pongCanvas = function ($window) {
        return {
            restrict: 'EAC',
            replace: true,
            transclude: true,
            template:
            '<md-content>' +
                '<div layout="row">' +
                    '<div flex="50" layout="row" layout-align="center center"><h1 ng-bind="pongCtrl.paddle1Score"></h1></div>' +
                    '<div flex="50" layout="row" layout-align="center center"><h1 ng-bind="pongCtrl.paddle2Score"></h1></div>' +
                '</div>' +
                '<canvas width="500" height="300" style="background-color:black;">' +
                '</canvas>' +
            '<md-content>',
            link: function (scope, element, attrs) {
                // Global vars
                var canvasElement,
                    canvasBorder,
                    canvasWidth,
                    canvasHeight,
                    canvasLeftBound,
                    canvasRightBound,
                    canvasUpperBound,
                    canvasLowerBound,
                    loader,
                    ball,
                    ballRadius,
                    ballXDirection,
                    ballYDirection,
                    paddleWidth,
                    paddleHeight,
                    paddle1,
                    paddle2;

                canvasElement = element[0].children[1];

                ballXDirection = -1;
                ballYDirection = -1;

                var activeListeners = [];
                var movementDistance = 10;
                var paddleDeltaDenominator = 100;
                var deltaDenominator = 1000;

                var drawGame = function () {
                    // TODO Need something to determine aspect ratio
                    if (scope.stage) {
                        scope.stage.autoClear = true;
                        scope.stage.removeAllChildren();
                        scope.stage.update();
                    } else {
                        scope.stage = new createjs.Stage(canvasElement);
                        // TODO Fix this non-sense...
                        // 32 for padding both sides
                        // 72 for nav bar height
                        // Should be size of parent container
                        canvasWidth = Math.floor(($window.innerWidth - 32) / 10) * 10;
                        canvasHeight = Math.floor(($window.innerHeight - 32 - 72) / 10) * 10 - 68;
                        scope.stage.canvas.width = canvasWidth;
                        scope.stage.canvas.height = canvasHeight;
                        //Load assets here
                        loader = new createjs.LoadQueue(false);
                    }

                    //Canvas Vars
                    canvasBorder = 10;
                    canvasLeftBound = canvasBorder;
                    canvasRightBound = canvasWidth - canvasBorder;
                    canvasUpperBound = canvasBorder;
                    canvasLowerBound = canvasHeight - canvasBorder;

                    //Ball
                    ballRadius = 10;
                    ball = new createjs.Shape();
                    ball.graphics.beginFill("white").drawCircle(0, 0, ballRadius);
                    ball.x = 50;
                    ball.y = 50;
                    scope.stage.addChild(ball);

                    //Paddle Vars
                    paddleHeight = 60;
                    paddleWidth = 15;

                    //Paddle 1 Paddle
                    paddle1 = new createjs.Shape();
                    paddle1.x = canvasBorder;
                    paddle1.y = canvasBorder;
                    paddle1.graphics.beginFill("white")
                        .drawRect(
                            0,
                            0,
                            paddleWidth,
                            paddleHeight
                        );
                    scope.stage.addChild(paddle1);

                    //Paddle 2 Paddle
                    paddle2 = new createjs.Shape();
                    paddle2.x = canvasWidth - canvasBorder - paddleWidth;
                    paddle2.y = canvasBorder;
                    paddle2.graphics.beginFill("white")
                        .drawRect(
                            0,
                            0,
                            paddleWidth,
                            paddleHeight
                        );
                    scope.stage.addChild(paddle2);

                    //Center Line
                    centerLine = new createjs.Shape();
                    centerLine.graphics.beginFill("white")
                        .drawRect(
                            canvasWidth / 2 + canvasBorder / 2,
                            canvasBorder,
                            10,
                            canvasHeight - canvasBorder * 2
                        );
                    scope.stage.addChild(centerLine);

                    //Update canvas
                    scope.stage.update();
                }();

                var getPaddle1Boundaries = function () {
                    var paddleX1 = paddle1.x + paddleWidth;
                    var paddleY1 = paddle1.y;
                    var paddleX2 = paddleX1;
                    var paddleY2 = paddle1.y + paddleHeight;
                    return {
                        x1: paddleX1,
                        y1: paddleY1,
                        x2: paddleX2,
                        y2: paddleY2
                    }
                };

                var getPaddle2Boundaries = function () {
                    var paddleX1 = paddle2.x;
                    var paddleY1 = paddle2.y;
                    var paddleX2 = paddleX1;
                    var paddleY2 = paddle2.y + paddleHeight;
                    return {
                        x1: paddleX1,
                        y1: paddleY1,
                        x2: paddleX2,
                        y2: paddleY2
                    }
                };

                var ballMovement = function (event) {
                    var deltaS = event.delta / deltaDenominator;
                    var paddle1Boundaries = getPaddle1Boundaries();
                    var paddle2Boundaries = getPaddle2Boundaries();
                    if ((Math.ceil(ball.x - ballRadius) <= paddle1Boundaries.x1
                        && ball.y >= paddle1Boundaries.y1
                        && ball.y <= paddle1Boundaries.y2)
                        ||
                        (Math.ceil(ball.x + ballRadius) >= paddle2Boundaries.x1
                        && ball.y >= paddle2Boundaries.y1
                        && ball.y <= paddle2Boundaries.y2)) {
                        ballXDirection *= -1;
                    } else {
                        if (ball.y + deltaS * movementDistance * ballYDirection >= canvasLowerBound) {
                            ballYDirection = -1;
                        }
                        if (ball.y + deltaS * movementDistance * ballYDirection <= canvasUpperBound) {
                            ballYDirection = 1;
                        }
                        if (ball.x + deltaS * movementDistance * ballXDirection >= canvasRightBound) {
                            ballXDirection = -1;
                        }
                        if (ball.x + deltaS * movementDistance * ballXDirection <= canvasLeftBound) {
                            ballXDirection = 1;
                        }                        
                        if (Math.ceil(ball.x - ballRadius) < (canvasBorder + paddleWidth)) {
                            // Update score
                            scope.pongCtrl.paddle2Score += 1;
                            scope.$digest();

                            // Display score text
                            var text = new createjs.Text("Paddle 2 Scored!", "bold 48px Arial", "white");
                            text.x = canvasWidth / 2 - text.getBounds().width / 2;
                            scope.stage.addChild(text);
                            scope.stage.update();

                            // Disable paddle movements
                            createjs.Ticker.removeEventListener("tick", ballMovement);
                            window.onkeydown = window.onkeyup = undefined;
                        }
                        if (Math.ceil(ball.x + ballRadius) > (canvasWidth - canvasBorder - paddleWidth)) {
                            // Update score
                            scope.pongCtrl.paddle1Score += 1;
                            scope.$digest();

                            // Display score text
                            var text = new createjs.Text("Paddle 1 Scored!", "bold 48px Arial", "white");
                            text.x = canvasWidth / 2 - text.getBounds().width / 2;
                            scope.stage.addChild(text);
                            scope.stage.update();

                            // Disable paddle movements
                            createjs.Ticker.removeEventListener("tick", ballMovement);
                            window.onkeydown = window.onkeyup = undefined;
                        }
                    }
                    ball.x = ball.x + deltaS * 100 * ballXDirection;
                    ball.y = ball.y + deltaS * 100 * ballYDirection;
                    scope.stage.update(event);
                };
                createjs.Ticker.addEventListener("tick", ballMovement);

                var handlePaddle1Up = function (event) {
                    // Rethink this, make tick occur 10 times for 1px per? Smoother?
                    // var deltaS = event.delta / paddleDeltaDenominator;
                    if (paddle1.y - movementDistance >= canvasUpperBound) {
                        paddle1.y = paddle1.y - movementDistance; // * deltaS
                        scope.stage.update(event);
                    }
                };

                var handlePaddle1Down = function (event) {
                    if (paddle1.y + movementDistance + paddleHeight <= canvasLowerBound) {
                        paddle1.y = paddle1.y + movementDistance;
                        scope.stage.update(event);
                    }
                };

                var handlePaddle2Up = function (event) {
                    if (paddle2.y - movementDistance >= canvasUpperBound) {
                        paddle2.y = paddle2.y - movementDistance;
                        scope.stage.update(event);
                    }
                };

                var handlePaddle2Down = function (event) {
                    if (paddle2.y + movementDistance + paddleHeight <= canvasLowerBound) {
                        paddle2.y = paddle2.y + movementDistance;
                        scope.stage.update(event);
                    }
                };

                var updateTickListeners = function (toAddListeners) {
                    for (var index in activeListeners) {
                        createjs.Ticker.removeEventListener("tick", activeListeners[index]);
                    }
                    activeListeners = [];
                    for (var index in toAddListeners) {
                        activeListeners.push(toAddListeners[index]);
                        createjs.Ticker.addEventListener("tick", toAddListeners[index]);
                    }
                };

                var removeTickListeners = function (toRemoveListeners) {
                    for (var index in toRemoveListeners) {
                        createjs.Ticker.removeEventListener("tick", toRemoveListeners[index]);
                        delete activeListeners[activeListeners.indexOf(toRemoveListeners[index])];
                    }
                };

                var removeAllTickListeners = function (e) {
                    for (var index in activeListeners) {
                        createjs.Ticker.removeEventListener("tick", activeListeners[index]);
                    }
                    activeListeners = [];
                };

                // CONTROLS
                var key = [];
                var controls = function(e) {
                    e = e || event; // to deal with IE
                    key[e.keyCode] = e.type == 'keydown';
                    if (key[87] && key[38]) {
                        // W/Up same time
                        updateTickListeners([handlePaddle1Up, handlePaddle2Up]);
                    } else if (key[87] && key[40]) {
                        // W/Down same time
                        updateTickListeners([handlePaddle1Up, handlePaddle2Down]);
                    } else if (key[83] && key[38]) {
                        // S/Up same time
                        updateTickListeners([handlePaddle1Down, handlePaddle2Up]);
                    } else if (key[83] && key[40]) {
                        // S/Down same time
                        updateTickListeners([handlePaddle1Down, handlePaddle2Down]);
                    } else if (key[87]) {
                        // W
                        updateTickListeners([handlePaddle1Up]);
                    } else if (key[38]) {
                        // Up
                        updateTickListeners([handlePaddle2Up]);
                    } else if (key[83]) {
                        // S
                        updateTickListeners([handlePaddle1Down]);
                    } else if (key[40]) {
                        // Down
                        updateTickListeners([handlePaddle2Down]);
                    }
                    if (e.type == 'keyup') {
                        if (e.keyCode == 87) {
                            // W
                            removeTickListeners([handlePaddle1Up]);
                        } else if (e.keyCode == 38) {
                            // Up
                            removeTickListeners([handlePaddle2Up]);
                        } else if (e.keyCode == 83) {
                            // S
                            removeTickListeners([handlePaddle1Down]);
                        } else if (e.keyCode == 40) {
                            // Down
                            removeTickListeners([handlePaddle2Down]);
                        }
                    }
                };

                var handleComplete = function () {
                    window.onkeydown = window.onkeyup = controls;
                    window.onblur = removeAllTickListeners;
                }();

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
