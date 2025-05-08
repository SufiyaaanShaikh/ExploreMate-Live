import * as Yup from "yup";

export const getValidationSchema = (isSignup) => {
  const baseSchema = {
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters long")
      .required("Password is required"),
  };

  if (isSignup) {
    return Yup.object({
      ...baseSchema,
      name: Yup.string()
        .matches(/^[A-Za-z\s]+$/, "Name must contain only letters and spaces")
        .min(5, "Too Short!")
        .max(20, "Too Long!")
        .required("Name is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm Password is required"),
    });
  }

  return Yup.object(baseSchema);
};
