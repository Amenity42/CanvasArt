
import Shape  from "./shape.js";
import Mapping from "./mapping.js";
import {saveToLocal, readFromLocal} from "./localStorageAccess.js";
import {draw, clearCanvas} from "./canvasAction.js";

const canvas = document.getElementById("testingCanvas");
const debugMessage = document.getElementById("outputDebug");
let loadedMap = new Mapping();

//*Check if canvas is created - read data from local storage and draw it to the canvas
if(canvas != null || canvas != undefined){

      readFromLocal(loadedMap, draw, reverseCenterpoint, canvas);

      console.log(`js loaded`);
      //*Get X and Y coordinates of mouse click on canvas
      canvas.addEventListener('click', function(e) {
            
            var rect = canvas.getBoundingClientRect();
            var x = e.clientX - rect.left;
            var y = e.clientY - rect.top;
            
 
      let pos = getMousePos(canvas, e);

                 //Check if a item is selected
                if(selectItem(pos.x, pos.y) == null || selectItem(pos.x, pos.y) == undefined){
                  console.log(`no item selected`);
      
                  //If no item is selected, create a new item
                  draw(pos.x, pos.y, false, canvas, loadedMap);
                  debugMessage.innerHTML = `Nothing Selected`;

                  return;
                }

      }, false);
}

//*Gets the mouse position on the canvas
function getMousePos(canvas, evt) {
      
      var rect = canvas.getBoundingClientRect();
     // console.log(`canvas width: ${canvas.width} canvas height: ${canvas.height}`);
      return {
          x: (evt.clientX - rect.left) / (rect.right - rect.left) * canvas.width,
          y: (evt.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height
      };
     
  }


//*Used to reverse the centerpoint calculation when adding new shape to canvas
function reverseCenterpoint(element){
      element.x = element.x + element.width / 2;
      element.y = element.y + element.height / 2;   
}

//Select an item on the canvas
function selectItem(x, y){
      //Get the item at the x and y coordinates
 //debugger;
 let foundElement = null;
      loadedMap.map.forEach(element => {
            const dx = x - element.x;
            const dy = y - element.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if(distance <= element.width + 5){
                  console.log(`item selected`);
                 
                  debugMessage.innerHTML = `Item Selected: ${element}`;

                  foundElement = element;
            }
            
            //If the item is selected, deselect it
            //If the item is not selected, select it
      });
      return foundElement;
      
}

const clearButton = document.getElementById("clearButton");
clearButton.addEventListener("click", clearCanvas);


