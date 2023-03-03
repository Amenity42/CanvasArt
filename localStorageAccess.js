//*Saves data to local storage
function saveToLocal(item, loadedMap){
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
 function readFromLocal(loadedMap, draw, reverseCenterpoint, canvas) {
 
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
             if(!element.condition){
                   reverseCenterpoint(element);
                   element.condition = true;
             }
             draw(element.x, element.y, readflag, canvas);
       });
       readflag = false;
 }

 export {saveToLocal, readFromLocal};