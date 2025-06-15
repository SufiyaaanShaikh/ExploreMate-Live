import React from "react";
import { Link, useLocation } from "react-router-dom";
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
}) => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";
  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({ isSubmitting }) => (
          <Form
            id="authForm"
            className={`"w-100" ${isLoginPage ? "flex flex-col" : "grid"}`}
          >
            {initialValues.name !== undefined && (
              <FormInput
                type="text"
                name="name"
                placeholder="Full Name"
                autoFocus
              />
            )}
            {initialValues.DOB !== undefined && (
              <FormInput type="date" name="DOB" placeholder="Date of Birth" />
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
              <Link to={redirectLink} className="">
                {redirectLinkText}
              </Link>
            </p>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default AuthForm;
