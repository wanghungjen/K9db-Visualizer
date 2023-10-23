import React from "react";
import MyControlButton from "./MyControlButton";
import { Controls } from "reactflow";

function ControlPanel() {
  return (
    <Controls>
      <MyControlButton name="v" action={() => console.log("validate")} />
      <MyControlButton name="s" action={() => console.log("schema")} />
    </Controls>
  );
}
export default ControlPanel;
