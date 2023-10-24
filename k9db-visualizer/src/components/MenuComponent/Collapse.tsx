import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Collapse from "react-bootstrap/Collapse";
import "./menu.css";
import { NavItem, Navbar, Nav } from "react-bootstrap";

function MyCollapse() {
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen(!open);

  return (
    <div>
      <>
        <div className="Buttons">
          <Button
            onClick={() => setOpen(!open)}
            aria-controls="example-collapse-text"
            aria-expanded={open}
          >
            Data Subjects
          </Button>
          <Navbar.Collapse in={open} dimension="width">
            <div id="example-collapse-text">
              <Card body style={{ width: "200px" }}>
                user
              </Card>
            </div>
          </Navbar.Collapse>
          <Button
            onClick={() => setOpen(!open)}
            aria-controls="example-collapse-text"
            aria-expanded={open}
          >
            Other Tables
          </Button>
        </div>
      </>
    </div>
  );
}

export default MyCollapse;
