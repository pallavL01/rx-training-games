/**
 * Rx Training Games Kickstarter
 *
 * Use this file to experiment your own idea.
 *
 * It is instantiated with an example showing how
 * to move a square using the keyboard.
 *
 * You can test it using the arrow keys of your keyboard.
 */

var squareSize = 15;

api.initGrid(squareSize);

var layer = api.addLayer('#337ab7');

layer.fill(api.randomSquare());

var arrowKeys = api.keyboard.filter(keyCode => keyCode in api.directions);

arrowKeys
    .do(key => console.log(key))
    .map(key => api.directions[key](layer.getActiveSquares()[0]))
    .filter(api.isWithinLimits)
    .do(coord => api.setText(coord.x + ' ' + coord.y))
    .do(layer.fill)
    .subscribe(() => layer.clear(layer.getActiveSquares()[0]));