import React from "react";
import MyControlButton from "./MyControlButton";
import { Controls } from "reactflow";

function ControlPanel({ handleParsedSchema, handleStateChange}) {
  return (
    <Controls>
      <MyControlButton handleStateChange={handleStateChange} name="input schema" handleParsedSchema={handleParsedSchema} />
      <MyControlButton  handleStateChange={handleStateChange} name="validation" handleParsedSchema={handleParsedSchema} />
    </Controls>
  );
}
export default ControlPanel;
