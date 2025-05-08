import React from "react";
import { Field, ErrorMessage } from "formik";

const FormInput = ({ type, name, placeholder, autoFocus = false }) => (
  <div className="input-block">
    <Field
      type={type}
      name={name}
      placeholder={placeholder}
      className="fw-500 f-16"
      autoFocus={autoFocus}
      autoComplete="off"
    />
    <ErrorMessage
      className="formErr para-f"
      name={name}
      component="div"
      style={{ color: "red" }}
    />
  </div>
);

export default FormInput;
