import React from "react";
import "./App.css";

import Flow from "./components/FlowComponent/Flow";
import MyCollapse from "./components/MenuComponent/Collapse";
export default function App() {
  return (
    <div>
      <div class="split left">
        <MyCollapse />
      </div>

      <div class="split right">
        <Flow />
      </div>
    </div>
  );
}
