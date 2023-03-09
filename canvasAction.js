import Shape from './shape.js';
import { saveItemToLocal } from './localStorageAccess.js';
import { canvas, debugMessage, loadedMap } from './logic.js';

// let canvas = document.getElementById('testingCanvas');
// let loadedMap = [];

//*Draws a shape on the canvas
function draw(x, y, readFlag, updateSelectedColour) {
    
	if (canvas.getContext) {
        
		const ctx = canvas.getContext('2d');
		
            //! shape could be created else where so it is not created here
		//Draw a rectangle
		let shape = createShape(x, y, 50, 50);

            //Check if the update flag is true if so then change the colour of the shape
            if(updateSelectedColour){
                  shape.colour = shape.colourWhenSelected;
            }
            
            shape.Selected = false;

		shape.getCenter();
		//console.table(shape);

		//ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
            
		ctx.fillStyle = shape.colour;
		ctx.fillRect(shape.x, shape.y, shape.height, shape.width);


            //If the read flag is false then save the item to local storage
		if (!readFlag) {
			saveItemToLocal(shape, loadedMap);
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
