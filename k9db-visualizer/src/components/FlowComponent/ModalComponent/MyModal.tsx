import React from "react";
import { Button, Modal } from "react-bootstrap";
import "./modal.css";
import { SchemaFrom } from "../SchemaFormComponent/SchemaFrom";

export const MyModal = ({
  show,
  onHide,
  content,
  title,
  schema,
  handleSchema,
  useSchema,
}) => {
  return (
    <div>
      <Modal className="mymodal" show={show} onHide={onHide}>
        <div className="mymodaltitle">{title}</div>
        {useSchema && (
          <SchemaFrom schema={schema} handleSchema={handleSchema}/>
        )}
        {useSchema && (
          <Button variant="mymodalbutton" onClick={onHide}>
            Submit
          </Button>
        )}

        {!useSchema && <span className="mymodalbody">{content}</span>}
        {!useSchema && (
          <div>
            <br />
            <br />
            <Button variant="mymodalbutton" onClick={onHide}>
              Close
            </Button>
          </div>
        )}
      </Modal>
    </div>
  );
};
