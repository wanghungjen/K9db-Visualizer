import React from "react";
import MyControlButton from "./MyControlButton";
import { Controls } from "reactflow";
import SchemaWindow from "./SchemaWindow";

interface Props {
  onSelectAction: (action: string) => void;
}

function ControlPanel({ onSelectAction }: Props) {
  // const handlers = [func1, func2, ]
  return (
    <Controls>
      {/* <MyControlButton name = "s"/> */}
      <SchemaWindow />
      <MyControlButton name="v" action={() => console.log("validate")} />
    </Controls>
  );
}
export default ControlPanel;
