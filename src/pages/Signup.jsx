import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import AuthForm from "../components/Form/AuthForm";
import { getValidationSchema } from "../schemas";
import FormHedaing from "../components/Form/FormHedaing";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AuthContext from "../context/AuthContext";

const Signup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { setCurrentUser } = useContext(AuthContext);

  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setLoading(true);

    try {
      // Use a local variable instead of state for userType
      let userTypeValue = "user";

      // Determine user type based on credentials
      if (
        values.email === "admin123@gmail.com" &&
        values.password === "admin123"
      ) {
        userTypeValue = "admin";
      }

      const { name, email, password } = values;
      setCurrentUser(name);
      // Use the local variable in the request
      const response = await axios.post(
        "https://exploremates-backend-production.up.railway.app/api/auth/signup",
        {
          name,
          email,
          password,
          userType: userTypeValue,
        },
        { timeout: 20000 }
      );

      if (response.status === 201) {
        toast.success("Account created successfully!");
        setTimeout(() => {
          navigate("/login");
        }, 1000);
        resetForm();
      }
    } catch (error) {
      console.error("Signup error:", error);
      toast.error(error.response?.data?.message || "Signup failed. Try again.");
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <section id="hero" className="grid vh-100 w-100">
      <div className="left"></div>
      <div className="right h-100 w-100 flex justify-content">
        <div className="sec">
          <FormHedaing
            heading="Hi, Get Started Now"
            subHeading="Enter details to create your Travel Pulse account"
          />
          <AuthForm
            initialValues={initialValues}
            validationSchema={getValidationSchema(true)}
            onSubmit={handleSubmit}
            buttonText="Sign Up"
            redirectText="Already have an account?"
            redirectLink="/login"
            redirectLinkText="Sign in to account"
            isLoading={loading}
          />
        </div>
      </div>
    </section>
  );
};

export default Signup;
