import React from "react";
import MyControlButton from "./MyControlButton";
import {Controls } from "reactflow";

interface Props {
  onSelectAction: (action: string) => void;
}

function ControlPanel({onSelectAction }: Props) {
    // const handlers = [func1, func2, ]
  return (
    <Controls>
      {/* <MyControlButton name = "s"/> */}
      <MyControlButton name = "s" action = {() => console.log("schema")}/>
      <MyControlButton name = "v" action = {() => console.log("validate")}/>

    </Controls>
  );
}
export default ControlPanel;
