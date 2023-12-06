import React, { useState } from "react";
import "./App.css";
import Flow from "./components/FlowComponent/Flow";
import MyCollapse from "./components/MenuComponent/Collapse";
import splitTablesEdges from "../utils/splitTableEdges";

export default function App() {
  const [selectedItem, setSelectedItem] = useState("");
  const [parsedSchema, setParsedSchema] = useState("");
  const [datasubject, setDatasubject] = useState([]);
  const [otherTables, setOtherTables] = useState([]);
  const [edges, setEdges] = useState([]);

  const handleParsedSchema = (parsedSchema) => {
    setParsedSchema(parsedSchema);
  };

  const handleSelectedItem = (selectedItem) => {
    setSelectedItem(selectedItem);
    console.log(selectedItem);
  };

  return (
    <div>
      <div className="split left">
        <MyCollapse
          datasubject={datasubject}
          otherTables={otherTables}
          edges={edges}
          handleSelectedItem={handleSelectedItem}
        />
      </div>

      <div className="split right">
        <Flow
          handleParsedSchema={handleParsedSchema}
          setDatasubject={setDatasubject}
          setOtherTables={setOtherTables}
          setEEdges={setEdges}
          parsedDataSubject={datasubject}
          parsedEdges={edges}
          parsedOtherTables={otherTables}
        />
      </div>
    </div>
  );
}
