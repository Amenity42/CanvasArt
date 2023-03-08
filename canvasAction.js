import Shape from './shape.js';
import { saveToLocal } from './localStorageAccess.js';
import { canvas, debugMessage, loadedMap } from './logic.js';

// let canvas = document.getElementById('testingCanvas');
// let loadedMap = [];

//*Draws a shape on the canvas
function draw(x, y, readFlag) {
	if (canvas.getContext) {
		const ctx = canvas.getContext('2d');
		//Seems to act as a resolution multiplier

		//Draw a rectangle
		let shape = createShape(x, y, 50, 50);

		shape.getCenter();
		//console.table(shape);

		//ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
		ctx.fillStyle = shape.colour;
		ctx.fillRect(shape.x, shape.y, shape.height, shape.width);

		if (!readFlag) {
			saveToLocal(shape, loadedMap);
			//console.table(loadedMap.map[loadedMap.map.length -1]);
		}
	} else {
		// canvas-unsupported code here
		alert('Canvas not supported');
	}
}

//*Creates a new shape object
function createShape(x, y, w, h) {
	let newShape = new Shape(x, y, w, h);
	return newShape;
}

function clearCanvas() {
	const ctx = canvas.getContext('2d');
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	localStorage.clear();
	loadedMap.map = [];
}

export { draw, clearCanvas };
