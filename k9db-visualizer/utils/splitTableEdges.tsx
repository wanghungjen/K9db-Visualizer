import { getGraph, topoSort } from "./graph.js";
import { calculateCoordinates } from "./coordinate.js";

const splitTablesEdges = function (parsedSchema) {
  var graph = getGraph(parsedSchema);
  var sortedNodes = topoSort(graph);
  var canvasWidth = 1000;
  var canvasHeight = 1000;
  var coordsMap = calculateCoordinates(
    sortedNodes,
    graph,
    canvasWidth,
    canvasHeight
  );
  let dataSubjects: any[] = [];
  let otherTables: any[] = [];

  //storing edge objects. ex: {annotation: 'owned_by', from: 'stories', to: 'user', edgeName: 'author'}
  let edges: any[] = [];

  for (const row of parsedSchema) {
    if (row.annotation === "data_subject") {
      dataSubjects.push(row.tableName);
    } else {
      edges.push(row);
    }
  }

  for (const row of parsedSchema) {
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
