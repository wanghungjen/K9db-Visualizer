import { getObjectsAndCoords } from "./interface.js";

const splitTablesEdges = function (schema) {
  var canvasWidth = 1500;
  var canvasHeight = 1000;
  let [modifiedObjects, coordsMap] = getObjectsAndCoords(
    schema,
    canvasWidth,
    canvasHeight
  );
  console.log(modifiedObjects)
  console.log(coordsMap)
  let dataSubjects = new Map(); // tableName: is a valid node or not
  let otherTables = new Map(); // tableName: is a valid node or not

  //storing edge objects. ex: {annotation: 'owned_by', from: 'stories', to: 'user', edgeName: 'author'}
  let edges: any[] = [];

  for (const row of modifiedObjects) {
    if (row.annotation === "data_subject") {
      dataSubjects.set(row.tableName, row.hasOwnProperty("errorMsg")) 
    } else if (row.annotation === "non_data_subject"){
      otherTables.set(row.tableName, row.hasOwnProperty("errorMsg"))
    } else{
      edges.push(row);
    }
  }

  let dsRes: any[] = [];
  let otRes: any[] = [];
  for (const [key, value] of Object.entries(coordsMap)) {
    if (dataSubjects.has(key)) {
      if (dataSubjects.get(key)) {
        value.errorMsg = "error";
      }
      dsRes.push(value)
    } else {
      if (otherTables.get(key)) {
        value.errorMsg = "error";
      }
      otRes.push(value);
    }
  }
  return [dsRes, otRes, edges];
};

export default splitTablesEdges;
