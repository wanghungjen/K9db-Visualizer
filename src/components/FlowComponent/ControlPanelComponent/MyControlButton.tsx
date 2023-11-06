import React, { useState } from "react";
import { ControlButton } from "reactflow";
import { PiUploadSimpleBold, PiCheckFatFill } from "react-icons/pi";
import { MyModal } from "../ModalComponent/MyModal";
import parse from "../../../../utils/parse";
import splitTablesEdges from "../../../../utils/splitTableEdges";

const MyControlButton = ({ name, handleParsedSchema, handleStateChange }) => {
  const [show, setShow] = useState(false);
  const [schema, setSchema] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSchema = (schema) => setSchema(schema);

  const handleSubmit = () => {
    setShow(false);
    let parsedSchema = parse(schema.content);
    handleParsedSchema(parsedSchema);
    let splitRes = splitTablesEdges(parsedSchema);
    handleStateChange(splitRes[0], splitRes[1], splitRes[2]);
  };

  return (
    <div>
      {name === "validation" ? (
        <ControlButton onClick={handleShow} title={name}>
          <PiCheckFatFill style={{ color: 'orange' }} />
        </ControlButton>
      ) : (
        <ControlButton onClick={handleShow} title={name}>
          <PiUploadSimpleBold style={{ color: 'orange' }} />
        </ControlButton>
      )}

      {name === "validation" ? (
        <MyModal
          show={show}
          onHide={handleClose}
          content={
            "hi. Your schema is invalid. Please check the following edges"
          }
          title={"Validation"}
          schema={schema}
          handleSchema={handleSchema}
          useSchema={false}
        />
      ) : (
        <MyModal
          schema={schema}
          show={show}
          onHide={handleSubmit}
          content={"hello"}
          title={"Input Schema"}
          handleSchema={handleSchema}
          useSchema={true}
        />
      )}
    </div>
  );
};

export default MyControlButton;
