import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import api from "../../config/axiosConfig"; // Adjust the path as needed

// Validation Schema
const ProfileValidationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters"),
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  phone: Yup.string()
    .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
    .nullable(),
  age: Yup.number()
    .positive("Age must be a positive number")
    .integer("Age must be an integer")
    .min(18, "Must be at least 18 years old")
    .max(120, "Age seems unrealistic")
    .nullable(),
  address: Yup.string().max(200, "Address too long").nullable(),
  bio: Yup.string().max(500, "Bio cannot exceed 500 characters").nullable(),
});

const ProfileForm = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imagePreview, setImagePreview] = useState(null);
  const [profileFile, setProfileFile] = useState(null);

  // Fetch user data from the database
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await api.get("/user/me");
        setUserData(response.data);
        setImagePreview(response.data.profilePhoto || null);
      } catch (error) {
        toast.error("Failed to fetch user details");
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUserData();
  }, []);

  // Handle image change (preview)
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProfileFile(file); // Store file for form submission
      
      // Create preview URL
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Submit handler
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      // Create FormData object to handle file upload
      const formData = new FormData();
      
      // Add text fields to FormData
      Object.keys(values).forEach(key => {
        if (values[key] !== null && values[key] !== undefined && key !== 'profilePhoto') {
          formData.append(key, values[key]);
        }
      });
      
      // Add file if it exists
      if (profileFile) {
        formData.append("profile", profileFile);
      }
      
      // Make the API request
      const response = await api.put("/user/update-profile", formData, {
        timeout: 20000,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      // Update local user data
      setUserData(prev => ({
        ...prev,
        ...response.data.data
      }));
      
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error("Update error:", error);
      toast.error(
        error.response?.data?.message || "Failed to update profile. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!userData) {
    return <p>No user data found</p>;
  }

  return (
    <Formik
      initialValues={{
        name: userData.name || "",
        email: userData.email || "",
        phone: userData.phone || "",
        age: userData.age || "",
        address: userData.address || "",
        bio: userData.bio || "",
      }}
      validationSchema={ProfileValidationSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ errors, touched, isSubmitting }) => (
        <Form className="space-y-6">
          <h2 className="text-2xl font-bold">My Account</h2>

          {/* Profile Photo Section */}
          <div className="flex flex-col items-center space-y-4">
            <label className="text-sm font-medium text-gray-700">Profile Photo</label>
            <div className="relative group">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Profile Preview"
                  className="w-32 h-32 object-cover rounded-full shadow-md"
                />
              ) : (
                <div className="w-32 h-32 bg-gray-200 flex items-center justify-center rounded-full shadow-md">
                  <span className="text-gray-500">No Image</span>
                </div>
              )}
              <label
                htmlFor="profilePhoto"
                className="absolute bottom-0 right-0 transform translate-y-1/2 translate-x-1/2 bg-blue-500 text-white px-4 py-2 text-xs font-medium rounded-full shadow-md cursor-pointer hover:bg-blue-600 transition"
              >
                Upload
                <input
                  type="file"
                  id="profilePhoto"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
            </div>
          </div>

          {/* Form Fields */}
          {["name", "email", "phone", "age", "address", "bio"].map((key) => (
            <div key={key} className="flex flex-col h-16">
              <label htmlFor={key} className="text-sm mb-2 font-medium text-gray-700">
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </label>
              <Field
                type={key === "age" ? "number" : key === "email" ? "email" : "text"}
                id={key}
                name={key}
                disabled = {isSubmitting}
                placeholder={`Your ${key.charAt(0).toUpperCase() + key.slice(1)}`}
                className="border text-xs border-gray-300 border-solid rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
              />
              {errors[key] && touched[key] && (
                <div className="text-red-500 text-xs mt-1">{errors[key]}</div>
              )}
            </div>
          ))}

          {/* Save Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 shadow-md"
          >
            {isSubmitting ? "Saving..." : "Save Changes"}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default ProfileForm;