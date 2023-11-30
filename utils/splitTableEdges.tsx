import { getCoords } from "./interface.js";

const splitTablesEdges = function (parsedObjects) {
  var canvasWidth = 1000;
  var canvasHeight = 500;
  let [modifiedObjects, coordsMap] = getCoords(
    parsedObjects,
    canvasWidth,
    canvasHeight
  );
  let dataSubjects = new Map(); // tableName: is a valid node or not
  let otherTables = new Map(); // tableName: is a valid node or not

  //storing edge objects. ex: {annotation: 'owned_by', from: 'stories', to: 'user', edgeName: 'author'}
  let edges: any[] = [];

  for (const row of modifiedObjects) {
    if (row.annotation === "data_subject") {
      dataSubjects.set(row.tableName, row.hasOwnProperty("errorMsg")) 
    } else {
      edges.push(row);
    }
  }

  for (const row of modifiedObjects) {
    if (row.annotation !== "data_subject") {
      if (!dataSubjects.has(row.from) && !otherTables.has(row.from)) {
        otherTables.set(row.from, row.hasOwnProperty("errorMsg"))
      }
      if (!dataSubjects.has(row.to) && !otherTables.has(row.to)) {
        otherTables.set(row.to, row.hasOwnProperty("errorMsg"))
      }
    }
  }
  console.log(dataSubjects)

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
