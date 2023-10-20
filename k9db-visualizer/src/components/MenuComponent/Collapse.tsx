import React from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Collapse from "react-bootstrap/Collapse";

function MyCollapse() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <>
        <Button
          onClick={() => setOpen(!open)}
          aria-controls="example-collapse-text"
          aria-expanded={open}
        >
          Data Subjects
        </Button>
        <div style={{ minHeight: "150px" }}>
          <Collapse in={open} dimension="width">
            <div id="example-collapse-text">
              <Card body style={{ width: "200px" }}>
                user
              </Card>
            </div>
          </Collapse>
        </div>
      </>
    </div>
  );
}

export default MyCollapse;
