import React from "react";
import MyControlButton from "./MyControlButton";
import { Controls } from "reactflow";

function ControlPanel({ handleParsedSchema, handleStateChange}) {
  return (
    <Controls>
      <MyControlButton handleStateChange={handleStateChange} name="s" handleParsedSchema={handleParsedSchema} />
      <MyControlButton  handleStateChange={handleStateChange} name="v" handleParsedSchema={handleParsedSchema} />
    </Controls>
  );
}
export default ControlPanel;
