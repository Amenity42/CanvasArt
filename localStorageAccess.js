import { canvas, loadedMap } from './logic.js';
// import { draw } from './canvasAction.js';

//*Saves data to local storage
function saveToLocal(item) {
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
//*Reads data from local storage and updates the map object
function readFromLocal(draw, reverseCenterpoint) {
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
			element.adjustXY = true;
		}
		draw(element.x, element.y, readflag, canvas);
	});
	readflag = false;
}

function updateLocal() {
	//This needs to update the canvas object as well as the local storage
	localStorage.setItem('canvas', JSON.stringify(loadedMap.map));
	// readFromLocal(draw, false);
}

export { saveToLocal, readFromLocal };
