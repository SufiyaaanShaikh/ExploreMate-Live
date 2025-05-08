import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import EyeClosedIcon from "../../images/eye_closed.svg";
import EyeOpenIcon from "../../images/eye_open.svg"; // You'll need to add this SVG
import laddak from "../../images/laddak.jpg";
import axios from "axios";
import api from "../../config/axiosConfig";

const PasswordChange = () => {
  const [step, setStep] = useState(1); // Step 1: Email verification, Step 2: Password change
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [verifiedEmail, setVerifiedEmail] = useState("");

  // Email validation schema
  const emailValidationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
  });

  // Password change validation schema
  const passwordChangeSchema = Yup.object({
    newPassword: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("New password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
      .required("Confirm password is required"),
  });

  // Handler for email verification
  const handleEmailVerification = async (values, { setSubmitting, setFieldError }) => {
    try {
      // Get the current user's details to verify email
      const response = await api.get("/user/me", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });

      // Check if the entered email matches the logged-in user's email
      if (response.data.email === values.email) {
        setVerifiedEmail(values.email);
        setStep(2); // Move to password change step
        toast.success("Email verified successfully!");
      } else {
        setFieldError("email", "Email doesn't match with your account email");
        toast.error("Email verification failed!");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
      console.error("Error verifying email:", error);
    } finally {
      setSubmitting(false);
    }
  };

  // Handler for password change
  const handlePasswordChange = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await api.put(
        "/user/change-password",
        {
          email: verifiedEmail,
          newPassword: values.newPassword,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      toast.success("Password changed successfully!");
      resetForm();
      setStep(1); // Reset to first step
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to change password");
      console.error("Error changing password:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="md:flex md:items-center md:justify-between space-y-6 md:space-y-0">
      <div className="md:w-2/4 space-y-6">
        <h2 className="text-2xl font-bold mb-2">Change Password</h2>
        
        {step === 1 ? (
          // Step 1: Email Verification Form
          <Formik
            initialValues={{ email: "" }}
            validationSchema={emailValidationSchema}
            onSubmit={handleEmailVerification}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-4">
                <div className="flex flex-col">
                  <label
                    htmlFor="email"
                    className="text-sm mb-2 font-medium text-gray-700"
                  >
                    Email Address
                  </label>
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email address"
                    className="border text-xs border-gray-300 border-solid rounded-md p-2 w-full focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-blue-500 text-white py-2 px-3 rounded-md hover:bg-blue-600 shadow-md text-sm disabled:bg-blue-300"
                >
                  {isSubmitting ? "Verifying..." : "Verify Email"}
                </button>
              </Form>
            )}
          </Formik>
        ) : (
          // Step 2: Password Change Form
          <Formik
            initialValues={{
              newPassword: "",
              confirmPassword: "",
            }}
            validationSchema={passwordChangeSchema}
            onSubmit={handlePasswordChange}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-4">
                <div className="flex flex-col">
                  <label
                    htmlFor="newPassword"
                    className="text-sm mb-2 font-medium text-gray-700"
                  >
                    New Password
                  </label>
                  <div className="relative">
                    <Field
                      type={showNewPassword ? "text" : "password"}
                      id="newPassword"
                      name="newPassword"
                      placeholder="Enter your new password"
                      className="border text-xs border-gray-300 border-solid rounded-md p-2 w-full focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-2 text-gray-500"
                    >
                      <img 
                        src={showNewPassword ? EyeOpenIcon : EyeClosedIcon} 
                        alt="Toggle visibility" 
                      />
                    </button>
                  </div>
                  <ErrorMessage
                    name="newPassword"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>

                <div className="flex flex-col">
                  <label
                    htmlFor="confirmPassword"
                    className="text-sm mb-2 font-medium text-gray-700"
                  >
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Field
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirmPassword"
                      name="confirmPassword"
                      placeholder="Confirm your new password"
                      className="border text-xs border-gray-300 border-solid rounded-md p-2 w-full focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-2 text-gray-500"
                    >
                      <img 
                        src={showConfirmPassword ? EyeOpenIcon : EyeClosedIcon} 
                        alt="Toggle visibility" 
                      />
                    </button>
                  </div>
                  <ErrorMessage
                    name="confirmPassword"
                    component="div"
                    className="text-red-500 text-xs mt-1"
                  />
                </div>

                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="bg-gray-300 text-gray-700 py-2 px-3 rounded-md hover:bg-gray-400 shadow-md text-sm"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-blue-500 text-white py-2 px-3 rounded-md hover:bg-blue-600 shadow-md text-sm disabled:bg-blue-300"
                  >
                    {isSubmitting ? "Changing..." : "Change Password"}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        )}
      </div>
      <div className="img-container">
        <div className="img-block">
          <img src={laddak} alt="laddak" />
        </div>
      </div>
    </div>
  );
};

export default PasswordChange;