import { loadedMap, debugMessage } from './logic.js';

class MouseActions {

      //*Select an item on the canvas
      selectItem(x, y){
            //Get the item at the x and y coordinates
      //debugger;
            let foundElement = null;
            let elementCount = 0;
            loadedMap.map.forEach(element => {
                  const dx = x - element.x;
                  const dy = y - element.y;
                  const distance = Math.sqrt(dx * dx + dy * dy);
                  elementCount++;
                  if(distance <= element.width + 5){
                        console.log(`item selected`);
                        console.table(element);
                        debugMessage.innerHTML = `Item Selected: ${element}
                                                  </br> X: ${element.x}
                                                  </br> Y: ${element.y}
                                                  </br> Element: ${elementCount - 1}
                                                 `;

                        foundElement = element;
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
                  x: (evt.clientX - rect.left) / (rect.right - rect.left) * canvas.width,
                  y: (evt.clientY - rect.top) / (rect.bottom - rect.top) * canvas.height
            };
     
      }

}

export default MouseActions;
