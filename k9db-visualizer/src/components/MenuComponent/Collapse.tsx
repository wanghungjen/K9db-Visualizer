import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Fade from "react-bootstrap/Collapse";
import "./menu.css";
import { NavItem, Navbar, Nav } from "react-bootstrap";

function MyCollapse() {
  const [openDS, setOpenDS] = useState(false);
  const [openT, setOpenT] = useState(false);
  const [openOE, setOpenOE] = useState(false);
  const [openODE, setOpenODE] = useState(false);
  const [openABE, setOpenABE] = useState(false);
  const [openAE, setOpenAE] = useState(false);

  const toggleCollapseDS = () => {
    setOpenDS(!openDS);
  };

  const toggleCollapseT = () => {
    setOpenT(!openT);
  };

  const toggleCollapseOE = () => {
    setOpenOE(!openOE);
  };

  const toggleCollapseODE = () => {
    setOpenODE(!openODE);
  };

  const toggleCollapseABE = () => {
    setOpenABE(!openABE);
  };

  const toggleCollapseAE = () => {
    setOpenAE(!openAE);
  };

  return (
    <div>
      <>
        <div className="Buttons">
          <Button onClick={toggleCollapseDS}>Data Subjects</Button>
          {openDS && (
            <div className="collapse">
              <Card body style={{ width: "200px" }}>
                user
              </Card>
            </div>
          )}
          <Button onClick={toggleCollapseT}>Other Tables</Button>
          {openT && (
            <div className="collapse">
              <Card body style={{ width: "200px" }}>
                Story
              </Card>
              <Card body style={{ width: "200px" }}>
                Tagging
              </Card>
              <Card body style={{ width: "200px" }}>
                Tag
              </Card>
              <Card body style={{ width: "200px" }}>
                Message
              </Card>
            </div>
          )}
          <Button onClick={toggleCollapseOE}>Owns Edge</Button>
          <Button onClick={toggleCollapseODE}>Owned Edges</Button>
          <Button onClick={toggleCollapseABE}>AccessedBy Edges</Button>
          <Button onClick={toggleCollapseAE}>Accesses Edges</Button>
        </div>
      </>
    </div>
  );
}

export default MyCollapse;
