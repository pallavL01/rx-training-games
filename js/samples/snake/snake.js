var snakeSpeedPulse = 30;
var squareSize = 15;

api.initGrid(squareSize);

var snake = api.addLayer('#337ab7');
var food = api.addLayer('#9bc2e3');

snake.fill({x: 1, y: 0}).fill({x: 1, y: 1}); // snake starting point

// duplicate the last direction at fixed intervals
var validKeystrokes = api.keyboard.filter(keyCode => keyCode in api.directions);
var directions = Rx.Observable
    .interval(snakeSpeedPulse)
    .withLatestFrom(validKeystrokes, (p, k) => k);

// detect snake-food collisions
var eaten = food.activations
    .flatMapLatest(foodCoord => snake.activations.filter(_.matcher(foodCoord)));

// add flag 'grow: true' when snake should grow
var updates = directions
    .window(eaten)
    .flatMap((directions, i) => directions.map((key, j) => ({key: key, grow: i && !j})));

// update snake position and size, trigger end-of-game
updates.subscribe(update => {

    var activeSquares = snake.getActiveSquares();
    var head = api.directions[update.key](_.last(activeSquares));
    if (api.isOffLimits(head) || _.findWhere(activeSquares, head)) api.gameOver();
    if (!update.grow) snake.clear(snake.getActiveSquares()[0]);
    snake.fill(head);
});

// update food
eaten.do(food.clear).subscribe(() => food.fill(api.randomSquare()));

food.fill(api.randomSquare());// first helping of food