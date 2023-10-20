import React from "react";
import {ControlButton } from "reactflow";

// Props : Name, Action

const MyControlButton = (props) => {
  const style = {};

  return (
    <div>
      <ControlButton onClick={props.action} title="action">
        <div style={{ color: "black" }}>{props.name}</div>
      </ControlButton>
    </div>
  );
};

export default MyControlButton;
