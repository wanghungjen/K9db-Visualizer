import React from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import "./popup.css";

export default () => (
  <Popup trigger={<button> Trigger</button>} position="right center">
    <div className="popup">Popup content here !!</div>
  </Popup>
);
