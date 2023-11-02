import React from "react";
import { Form } from "react-bootstrap";
import "./form.css";

export const SchemaFrom = ({ schema, handleSchema }) => {
  const onChange = (e) => {
    handleSchema({ content: e.target.value });
  };

  return (
    <Form className="form">
      <Form.Control
        className="inputbox"
        type="text"
        placeholder="Please input the schema here..."
        as="textarea"
        rows={20}
        cols={52}
        spellCheck={false}
        onChange={onChange}
        value={schema.schema}
      />
      <br />
      <span
        style={{ paddingTop: "2%", maxWidth: "175%", minWidth: "fit-content" }}
      >
        We'll never store your schema.
      </span>
    </Form>
  );
};
