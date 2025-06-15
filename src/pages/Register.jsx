import { useContext, useState } from "react";
import toast from "react-hot-toast";
import AuthForm from "../components/Form/AuthForm";
import { getValidationSchema } from "../schemas";
import FormHeading from "../components/Form/FormHeading";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import OTPModal from "../components/Form/OTPModal";
import api from "../config/axiosConfig";

function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showOTPModal, setShowOTPModal] = useState(false);
  const [userEmail, setUserEmail] = useState("");

  const initialValues = {
    name: "",
    email: "",
    DOB: "",
    password: "",
    confirmPassword: "",
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setLoading(true);

    try {
      // Determine user type based on credentials
      let userTypeValue = "user";
      if (
        values.email === "admin123@gmail.com" &&
        values.password === "admin123"
      ) {
        userTypeValue = "admin";
      }

      const { name, email, password, DOB } = values;

      // Step 1: Send OTP to email
      const response = await api.post(
        "auth/send-signup-otp",
        {
          name,
          email,
          password,
          DOB,
          userType: userTypeValue,
        },
        { timeout: 20000 }
      );

      if (response.status === 200) {
        setUserEmail(email);
        setShowOTPModal(true);
        toast.success("OTP sent to your email!");
      }
    } catch (error) {
      console.error("Signup error:", error);
      toast.error(
        error.response?.data?.message || "Failed to send OTP. Try again."
      );
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  const handleOTPSuccess = (data) => {
    setShowOTPModal(false);
    toast.success("Account created successfully!");
    setTimeout(() => {
      navigate("/login");
    }, 1000);
  };

  const handleResendOTP = async () => {
    try {
      const response = await api.post(
        "auth/resend-otp",
        { email: userEmail },
        { timeout: 15000 }
      );
      
      if (response.status === 200) {
        return Promise.resolve();
      }
    } catch (error) {
      console.error("Resend OTP error:", error);
      throw error;
    }
  };

  const handleCloseModal = () => {
    setShowOTPModal(false);
    setUserEmail("");
  };

  return (
    <>
      <section id="hero" className="grid vh-100 w-100">
        <div className="left"></div>
        <div className="right h-100 w-100 flex justify-content">
          <div className="sec">
            <FormHeading
              heading="CREATE AN ACCOUNT"
              subHeading="By creating an account, you agree to our Privacy policy and Terms of use."
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

      {/* OTP Modal */}
      <OTPModal
        isOpen={showOTPModal}
        onClose={handleCloseModal}
        email={userEmail}
        onSuccess={handleOTPSuccess}
        onResendOTP={handleResendOTP}
      />
    </>
  );
}
export default Register;