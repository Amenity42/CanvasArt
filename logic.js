
import Shape  from "./shape.js";
import Mapping from "./mapping.js";

const canvas = document.getElementById("testingCanvas");
canvas.width = 2000;
canvas.height = 2000;

//Create a new mapping object
let loadedMap = new Mapping();

readFromLocal();

console.log(`js loaded`);
//Get X and Y coordinates of mouse click on canvas
canvas.addEventListener('click', function(e) {
      //console.log(`canvas width: ${canvas.width} canvas height: ${canvas.height}`);
      var rect = canvas.getBoundingClientRect();
      var x = e.clientX - rect.left;
      var y = e.clientY - rect.top;

     let pos = getMousePos(canvas, e);

      draw(pos.x, pos.y);
}, false);

function draw(x,y, readFlag){
      //alert(`test`);

      if (canvas.getContext) {
            const ctx = canvas.getContext("2d");
            //Seems to act as a resolution multiplier

            //Draw a rectangle
            let shape = createShape(x, y, 50, 50);
            console.log(`shape created`);
            console.table(shape);

            console.log(`shape centre`);
            shape.getCenter();
            console.table(shape);

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


function getMousePos(canvas, evt) {
      
      var rect = canvas.getBoundingClientRect();
     // console.log(`canvas width: ${canvas.width} canvas height: ${canvas.height}`);
      return {
          x: (evt.clientX - rect.left) / (rect.right - rect.left) * canvas.width,
          y: (evt.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height
      };
     
  }

function createShape(x, y ,w, h){
      let newShape = new Shape(x, y, w, h);
      return newShape;
}

function saveToLocal(item){
     // debugger;
      //Save the canvas to local storage
      //readFromLocal();
      
      try {
            console.log(typeof(item));
            console.log(`item: ${item.x}`);
            console.log(loadedMap);
            loadedMap.map.push(item);
            localStorage.setItem("canvas", JSON.stringify(loadedMap.map));
      } catch (error) {
            console.log(`Error: ${error}`);
      }
      //console.table(loadedMap.map);
}

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

function reverseCenterpoint(element){
      element.x = element.x + element.width / 2;
      element.y = element.y + element.height / 2;   
}

