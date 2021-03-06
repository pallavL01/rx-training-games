var snakeSpeedPulse = 50;

api.initGrid({squareSize: 10});

// spawn a snake with size 3
var snake = api.addLayer({color: '#337ab7'});
snake.fill({x: 10, y: 0}).fill({x: 10, y: 1}).fill({x: 10, y: 2});

var pulse = Rx.Observable.interval(snakeSpeedPulse);

var validKeystrokes = api.keyboard.where(keyCode => keyCode in api.directions);

// duplicate the last keystroke at fixed intervals
var directions = pulse.withLatestFrom(validKeystrokes, (p, k) => k);

// move the snake
directions
    .map(key => api.directions[key](snake.getActiveSquares()[2]))
    .where(api.isWithinLimits)
    .do(snake.fill)
    .subscribe(() => snake.clear(snake.getActiveSquares()[0]));
