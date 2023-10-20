import React from "react";
import "./App.css";

import Flow from "./components/FlowComponent/Flow";
export default function App() {
  return (
    <div>
      <div class="split left">
        <div>
          <h2>PANEL 1</h2>
        </div>
      </div>

      <div class="split right">
        <div style={{ width: "100vw", height: "100vh" }}>
          <Flow />
        </div>
      </div>
    </div>
  );
}
