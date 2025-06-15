import  { useContext } from "react";
import { useNavigate } from "react-router-dom";
import AuthForm from "../components/Form/AuthForm";
import { getValidationSchema } from "../schemas";
import AuthContext from "../context/AuthContext";
import FormHedaing from "../components/Form/FormHeading";
import toast from "react-hot-toast";
import api from "../config/axiosConfig";

const Login = () => {
  const { handleLogin, currentUser } = useContext(AuthContext);
  const navigate = useNavigate();


  const initialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    const { email, password } = values;

    try {
      const { data, status } = await api.post(
        "auth/login",
        { email, password },
        { withCredentials: true } 
      );

      if (status === 200) {
        const token = data.data.accessToken;
        handleLogin(token); // Use the context function instead of directly setting localStorage

        toast.success("Login successful!");
        setTimeout(() => {
          toast.dismiss();
          navigate("/"); // Navigate to the homepage or dashboard
        }, 1000);
        resetForm();
      }
      
     
    } catch (error) {
      console.error("Login error:", error);
      toast.error(error.response?.data?.message || "Login failed. Try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="hero" className="grid vh-100 w-100">
      <div className="login-left left"></div>
      <div className="right h-100 w-100 flex justify-content">
        <div className="sec">
          <FormHedaing
            heading="Welcome Back, "
            subHeading="Enter Login Details"
            user={currentUser} 
          />
          <AuthForm
            initialValues={initialValues}
            validationSchema={getValidationSchema(false)}
            onSubmit={handleSubmit}
            buttonText="Log In"
            redirectText="Don't have an account yet?"
            redirectLink="/signup"
            redirectLinkText="Create account"
          />
        </div>
      </div>
    </section>
  );
};

export default Login;
