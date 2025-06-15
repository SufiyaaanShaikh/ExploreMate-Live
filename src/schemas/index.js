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
      DOB: Yup.date()
        .typeError("Invalid date format")
        .test(
          "age",
          "You must be at least 18 years old",
          (value) => {
            if (!value) return true; // Skip validation if value is empty
            const today = new Date();
            const birthDate = new Date(value);
            const age = today.getFullYear() - birthDate.getFullYear();
            const monthDiff = today.getMonth() - birthDate.getMonth();
            return age > 18 || (age === 18 && monthDiff >= 0);
          }
        )
        .max(new Date(), "Date of Birth cannot be in the future")
        .required("Date of Birth is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm Password is required"),
    });
  }

  return Yup.object(baseSchema);
};
