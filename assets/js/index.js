var firstLayer = new Layer();

// Create a Paper.js Path to draw a line into it:
var path = new Path();

// Give the stroke a color
path.strokeColor = "black";
var path = new Path.Circle({
  center: view.center,
  radius: 30,
  strokeColor: "black",
  fillColor: "black",
});

// The amount of circles we want to make:
var count = 50;
var scale = 0.5;

// Create a symbol, which we will use to place instances of later:
var petal = new Raster("./assets/img/petal.png");

var circles = new Path.Circle({
  center: [0, 0],
  radius: 10,
  fillColor: "black",
});

var secondLayer = new Layer();

var symbol = new Symbol(petal);

// Place the instances of the symbol:
for (var i = 0; i < count; i++) {
  // The center position is a random point in the view:
  var center = Point.random() * view.size;
  var placedSymbol = symbol.place(center);
  placedSymbol.scale((i * scale) / count);
  placedSymbol.rotate(220);
}

function onResize(event) {
  // Whenever the window is resized, recenter the path:
  path.position = view.center;
}

// The onFrame function is called up to 60 times a second:
function onFrame(event) {
  // Run through the active layer's children list and change
  // the position of the placed symbols:

  for (var i = 0; i < 3; i++) {
    var itm = firstLayer.children[i];
    itm.position.x += 40;
  }

  for (var i = 0; i < count; i++) {
    var item = secondLayer.children[i];

    // Move the item 1/20th of its width to the right. This way
    // larger circles move faster than smaller circles:
    item.position.x += item.bounds.width / 35;

    // If the item has left the view on the right, move it back
    // to the left:
    if (item.bounds.left > view.size.width) {
      item.position.x = -item.bounds.width;
    }
  }
  circles.fillColor.hue += 0.5;
}

var width = 100;
var height = 100;

// Create a circle shaped path at the center of the view:
var thirdLayer = new Layer();
var cube = new Raster("./assets/img/cube-blue.png");
// var path = new Path.Circle({
//     radius: 50,

//     fillColor: 'blue'
// });

var symbol = new Symbol(cube);

// Install a drag event handler that moves the path along.
path.onMouseDrag = function (event) {
  path.position += event.delta;
};
