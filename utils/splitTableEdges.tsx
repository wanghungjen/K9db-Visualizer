import { getCoords } from "./interface.js"

const splitTablesEdges = function (parsedObjects) {
  var canvasWidth = 1000;
  var canvasHeight = 500;
  let [modifiedObjects, coordsMap] = getCoords(parsedObjects, canvasWidth, canvasHeight)
  let dataSubjects: any[] = [];
  let otherTables: any[] = [];

  //storing edge objects. ex: {annotation: 'owned_by', from: 'stories', to: 'user', edgeName: 'author'}
  let edges: any[] = [];

  for (const row of modifiedObjects) {
    if (row.annotation === "data_subject") {
      dataSubjects.push(row.tableName);
    } else {
      edges.push(row);
    }
  }

  for (const row of modifiedObjects) {
    if (row.annotation !== "data_subject") {
      if (!dataSubjects.includes(row.from) && !otherTables.includes(row.from)) {
        otherTables.push(row.from);
      }
      if (!dataSubjects.includes(row.to) && !otherTables.includes(row.to)) {
        otherTables.push(row.to);
      }
    }
  }

  let dsRes: any[] = [];
  let otRes: any[] = [];
  for (const [key, value] of Object.entries(coordsMap)) {
    if (dataSubjects.includes(key)) {
      dsRes.push(value);
    } else {
      otRes.push(value);
    }
  }

  return [dsRes, otRes, edges];
};

export default splitTablesEdges;
