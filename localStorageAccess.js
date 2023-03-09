import { draw } from './canvasAction.js';
import { canvas, loadedMap, reverseCenterpoint } from './logic.js';
// import { draw } from './canvasAction.js';

//*Saves data to local storage
function saveItemToLocal(item) {
	// debugger;
	//Save the canvas to local storage
	//readFromLocal();

	try {
		loadedMap.map.push(item);
		localStorage.setItem('canvas', JSON.stringify(loadedMap.map));
	} catch (error) {
		console.log(`Error: ${error}`);
	}
	//console.table(loadedMap.map);
}

function saveAllToLocal() {


      //console.table(loadedMap.map);
}
//*Reads data from local storage and updates the map object
function readFromLocal(elementPosition) {

	let readflag = true;

	console.log(`Read Data From Local Storage`);

	let mapData = JSON.parse(localStorage.getItem('canvas'));

	//Update map object with data from local storage
	if (!mapData) {
		console.log(`No data in local storage`);
		return;
	}
	loadedMap.map = mapData;

	console.table(mapData);

	mapData.forEach((element) => {
		if (!element.adjustXY) {
			reverseCenterpoint(element);
			element.adjustXY = true; //Somehow this is getting set to true else where
		}

            let pos = mapData.indexOf(element);
            let updateSelectedColour = false;
            
            if(elementPosition == pos) {
                  console.log(`Element Position: ${elementPosition}  Pos: ${pos}`);
                  updateSelectedColour = true;
            }
            if(elementPosition == undefined || elementPosition == false && elementPosition == typeof Number) {
                  updateSelectedColour = false;
            }
		draw(element.x, element.y, readflag, updateSelectedColour);
	});
	readflag = false;
}

//* Need a function which updates the local storage with the current map object and then redraws the canvas
function updateLocal(elementPosition) {
      
      //1 - Update the local storage
      try {
            localStorage.setItem('canvas', JSON.stringify(loadedMap.map));
      } catch (error) {
            console.log(`Error: ${error}`);
      }

      //2 - Update the canvas - clear canvas and redraw
      //Clear canvas
      canvas.width = canvas.width;

      //Redraw canvas
      readFromLocal(elementPosition);

}

export { saveItemToLocal, readFromLocal, saveAllToLocal, updateLocal };
