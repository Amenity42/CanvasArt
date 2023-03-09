import { loadedMap, debugMessage, canvas, reverseCenterpoint } from './logic.js';
import { saveItemToLocal, updateLocal } from './localStorageAccess.js';

class MouseActions {
	//*Select an item on the canvas
	selectItem(x, y) {
		//Get the item at the x and y coordinates
		//debugger;
		let foundElement = null;
		let elementPosition = 0;
		loadedMap.map.forEach((element) => {
			const dx = x - element.x;
			const dy = y - element.y;
			const distance = Math.sqrt(dx * dx + dy * dy);
			elementPosition++;
			if (distance <= element.width + 5) {
				console.log(`item selected`);
				console.table(element);
				debugMessage.innerHTML = `Item Selected: ${element}
                                                  </br> X: ${element.x}
                                                  </br> Y: ${element.y}
                                                  </br> Element: ${
								elementPosition - 1
							}
                                                 `;

				foundElement = element;
				console.table(element);

				//Will need a new function to update local and canvas
				foundElement.colour =
					foundElement.colourWhenSelected;
                        foundElement.Selected = true;

                        //Check array for any other selected and reverse colour and flag
                        loadedMap.map.forEach((element) => {
                              if (element.Selected == true && element != foundElement) {
                                    element.colour = element.orginalColour;
                                    element.Selected = false;
                              }
                              });
                        
                        updateLocal(elementPosition - 1);
                        
			}

			//If the item is selected, deselect it
			//If the item is not selected, select it
		});
		return foundElement;
	}

	//*Gets the mouse position on the canvas
	getMousePos(canvas, evt) {
		var rect = canvas.getBoundingClientRect();
		return {
			x:
				((evt.clientX - rect.left) /
					(rect.right - rect.left)) *
				canvas.width,
			y:
				((evt.clientY - rect.top) /
					(rect.bottom - rect.top)) *
				canvas.height,
		};
	}
}

export default MouseActions;
