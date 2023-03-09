import Mapping from './mapping.js';
import { saveItemToLocal, readFromLocal, updateLocal } from './localStorageAccess.js';
import { draw, clearCanvas } from './canvasAction.js';
import MouseActions from './mouseActions.js';

export const canvas = document.getElementById('testingCanvas');
export const debugMessage = document.getElementById('outputDebug');
export let loadedMap = new Mapping();
export let mouseActions = new MouseActions();

//*Check if canvas is created - read data from local storage and draw it to the canvas
if (canvas != null || canvas != undefined) {
      let update = false;
	readFromLocal(update);

	console.log(`js loaded`);
	//*Get X and Y coordinates of mouse click on canvas
	canvas.addEventListener(
		'click',
		function (e) {
			var rect = canvas.getBoundingClientRect();
			var x = e.clientX - rect.left;
			var y = e.clientY - rect.top;

			//let pos = getMousePos(canvas, e);
			let pos = mouseActions.getMousePos(canvas, e);

			//Check if a item is selected
			if (
				mouseActions.selectItem(pos.x, pos.y) == null ||
				mouseActions.selectItem(pos.x, pos.y) ==
					undefined
			) {
				console.log(`no item selected`);

				//If no item is selected, create a new item
                        let updateSelectedColour = false;
				draw(pos.x, pos.y, false, updateSelectedColour);
				debugMessage.innerHTML = `Nothing Selected`;
                        updateLocal(false);

				return;
			}
		},
		false
	);
}

//*Used to reverse the centerpoint calculation when adding new shape to canvas
export function reverseCenterpoint(element) {
	element.x = element.x + element.width / 2;
	element.y = element.y + element.height / 2;
}

const clearButton = document.getElementById('clearButton');
clearButton.addEventListener('click', clearCanvas);
