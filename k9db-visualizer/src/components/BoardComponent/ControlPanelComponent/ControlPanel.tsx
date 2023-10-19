import React, { useState } from "react";
import MyControlButton from "./MyControlButton";
import { ControlButton, Controls } from "reactflow";

interface Props {
  actions: string[];
  header: string;
  onSelectAction: (action: string) => void;
}
function ControlPanel({ actions, header, onSelectAction }: Props) {
  return (
    <Controls>
      <MyControlButton>
        <div>1</div>
      </MyControlButton>
      <MyControlButton>
        <div>2</div>
      </MyControlButton>
    </Controls>
  );
}
export default ControlPanel;
