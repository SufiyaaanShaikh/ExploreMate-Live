import React from "react";
import { Link } from "react-router-dom";
import { Formik, Form } from "formik";
import FormInput from "./FormInput";

const AuthForm = ({
  initialValues,
  validationSchema,
  onSubmit,
  buttonText,
  redirectText,
  redirectLink,
  redirectLinkText,
}) => (
  <Formik
    initialValues={initialValues}
    validationSchema={validationSchema}
    onSubmit={onSubmit}
  >
    {({ isSubmitting }) => (
      <Form id="authForm" className="flex w-100">
        {initialValues.name !== undefined && (
          <FormInput
            type="text"
            name="name"
            placeholder="Full Name"
            autoFocus
          />
        )}
        <FormInput
          type="email"
          name="email"
          placeholder="Email Address"
          {...(initialValues.name === undefined && {
            autoFocus: true,
          })}
        />
        <FormInput type="password" name="password" placeholder="Password" />
        {initialValues.confirmPassword !== undefined && (
          <FormInput
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
          />
        )}
        <button
          type="submit"
          className="formBtn fw-700"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Processing..." : buttonText}
        </button>
        <p className="acc-para fw-500">
          {redirectText}
          <Link to={redirectLink} className="fw-500">
            {redirectLinkText}
          </Link>
        </p>
      </Form>
    )}
  </Formik>
);

export default AuthForm;
