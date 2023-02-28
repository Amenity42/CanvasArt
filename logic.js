
import Shape  from "./shape.js";

const canvas = document.getElementById("testingCanvas");
canvas.width = 2000;
canvas.height = 2000;

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

function draw(x,y){
      //alert(`test`);

      if (canvas.getContext) {
            const ctx = canvas.getContext("2d");
            //Seems to act as a resolution multiplier

            //Draw a rectangle
            let shape = createShape(x, y, 50, 50);
            shape.getCenter();
            console.table(shape);
            //ctx.fillStyle = "rgba(0, 0, 200, 0.5)";
            ctx.fillStyle = shape.colour;
            ctx.fillRect(shape.x, shape.y, shape.height, shape.width);

           // shape.colour();
            
          } else {
            // canvas-unsupported code here
            alert("Canvas not supported");
          }
}


function getMousePos(canvas, evt) {
      
      var rect = canvas.getBoundingClientRect();
      console.log(`canvas width: ${canvas.width} canvas height: ${canvas.height}`);
      return {
          x: (evt.clientX - rect.left) / (rect.right - rect.left) * canvas.width,
          y: (evt.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height
      };
     
  }

function createShape(x, y ,w, h){
      let newShape = new Shape(x, y, w, h);
      return newShape;
}

