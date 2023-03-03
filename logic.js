
import Shape  from "./shape.js";
import Mapping from "./mapping.js";

const canvas = document.getElementById("testingCanvas");
const debugMessage = document.getElementById("outputDebug");
let loadedMap = new Mapping();

if(canvas){
      //       canvas.width = 2000;
      // canvas.height = 2000;

      //Create a new mapping object

      readFromLocal();

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
                  console.log(selectItem(pos.x, pos.y));
                  //If no item is selected, create a new item
                  draw(pos.x, pos.y);
                  return;
                }

      }, false);
}

//*Draws a shape on the canvas
function draw(x,y, readFlag){
      //alert(`test`);

      if (canvas.getContext) {
            const ctx = canvas.getContext("2d");
            //Seems to act as a resolution multiplier

            //Draw a rectangle
            let shape = createShape(x, y, 50, 50);

            shape.getCenter();
            //console.table(shape);

            //ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
            ctx.fillStyle = shape.colour;
            ctx.fillRect(shape.x, shape.y, shape.height, shape.width);

           if(!readFlag){
                 saveToLocal(shape);
                 //console.table(loadedMap.map[loadedMap.map.length -1]);
           }
            
          } else {
            // canvas-unsupported code here
            alert("Canvas not supported");
          }
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
//*Creates a new shape object
function createShape(x, y ,w, h){
      let newShape = new Shape(x, y, w, h);
      return newShape;
}

//*Saves data to local storage
function saveToLocal(item){
     // debugger;
      //Save the canvas to local storage
      //readFromLocal();
      
      try {
            loadedMap.map.push(item);
            localStorage.setItem("canvas", JSON.stringify(loadedMap.map));
      } catch (error) {
            console.log(`Error: ${error}`);
      }
      //console.table(loadedMap.map);
}
//*Reads data from local storage and updates the map object
function readFromLocal() {

      let readflag = true;
      console.log(`Read Data From Local Storage`);
  
     let mapData = JSON.parse(localStorage.getItem("canvas"));

     //Update map object with data from local storage
     if(!mapData){
      console.log(`No data in local storage`);
            return;
     }
      loadedMap.map = mapData;

     console.table(mapData);
      

     if(!mapData){
             return;
      }

      mapData.forEach(element => {
            if(!element.Condition){
                  reverseCenterpoint(element);
                  element.Condition = true;
            }
            draw(element.x, element.y, readflag);
      });
      readflag = false;
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
      loadedMap.map.forEach(element => {
            const dx = x - element.x;
            const dy = y - element.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if(distance <= element.width + 5){
                  console.log(`item selected`);
                 
                  debugMessage.innerHTML = `Item Selected: ${element}`;

                  return element;
            }
            
            //If the item is selected, deselect it
            //If the item is not selected, select it
      });
      return null;
      
}

const clearButton = document.getElementById("clearButton");
clearButton.addEventListener("click", clearCanvas);

function clearCanvas(){
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      localStorage.clear();
      loadedMap.map = [];
}

