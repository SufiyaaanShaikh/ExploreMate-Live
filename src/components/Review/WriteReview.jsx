import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import api from "../../config/axiosConfig";
import { useNavigate } from "react-router-dom";
import reviewSchema from "../../schemas/reviewSchema";
import toast from "react-hot-toast";

function WriteReview() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");

 

  // Initial form values
  const initialValues = {
    title: "",
    reviewDes: "",
    locationVisited: "",
    rating: "5",
    duration: "",
    startDate: "",
    endDate: ""
  };

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
    }
  };

  const handleFileRemove = () => {
    setFile(null);
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    const uploadedFile = e.dataTransfer.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault(); // Allow file drop
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    setError("");

    try {
      // Create form data for sending to API
      const reviewFormData = new FormData();

      // Add form fields to FormData
      Object.keys(values).forEach((key) => {
        if (values[key] !== "" && values[key] !== null && values[key] !== undefined) {
          reviewFormData.append(key, values[key]);
        }
      });

      // Add file if exists
      if (file) {
        reviewFormData.append("reviewPhoto", file);
      }

      // Submit to API
      const response = await api.post("/review", reviewFormData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      
      if (response.data.success) {
        // Reset form and file state
        resetForm();
        setFile(null);
        
        // Redirect or show success message
        navigate("/profile");
        toast.success("Review submitted successfully!")
      }
    } catch (err) {
      setError(err.response?.data?.message || "Failed to submit review");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      {/* Main container */}
      <div className="bg-white p-8 rounded-lg shadow-lg w-full">
        <Formik
          initialValues={initialValues}
          validationSchema={reviewSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, errors, touched }) => (
            <Form>
              {error && (
                <div className="mb-4 p-3 bg-red-100 text-red-800 rounded-lg">
                  {error}
                </div>
              )}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* File Upload Section */}
                <label
                  className="border-2 border-dashed border-gray-300 hover:border-[#dee7ff] cursor-pointer p-6 rounded-lg flex flex-col items-center justify-center"
                  onDrop={handleFileDrop}
                  onDragOver={handleDragOver}
                >
                  <div className="text-center">
                    <i className="fas fa-image text-gray-600 text-6xl mb-4"></i>
                    <p className="text-gray-600">Drop your travel photos here</p>
                    <p className="text-gray-500 text-sm">
                      PNG, JPG, or WEBP. Max 5MB.
                    </p>
                    <p className="text-gray-500 text-sm mt-2">Or choose a file</p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <button
                      type="button"
                      className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
                      onClick={() =>
                        document.querySelector('input[type="file"]').click()
                      }
                    >
                      Browse
                    </button>
                  </div>
                  {file && (
                    <div className="mt-4 w-full">
                      <div className="bg-gray-100 p-2 rounded flex justify-between items-center mb-2">
                        <span className="text-gray-600">{file.name}</span>
                        <button
                          type="button"
                          className="text-gray-600 hover:text-gray-800"
                          onClick={handleFileRemove}
                        >
                          <i className="fas fa-times"></i>
                        </button>
                      </div>
                    </div>
                  )}
                </label>

                {/* Form Section */}
                <div>
                  <div className="mb-6">
                    <label className="block text-gray-600 mb-2">Trip Title*</label>
                    <Field
                      type="text"
                      name="title"
                      className={`w-full p-3 border-solid bg-white text-gray-700 rounded border ${
                        errors.title && touched.title 
                          ? "border-red-500 focus:ring-red-500"
                          : "border-gray-300 focus:ring-blue-600"
                      } focus:outline-none focus:ring-2 focus:border-transparent`}
                      placeholder="Enter trip title"
                    />
                    <ErrorMessage name="title" component="div" className="text-red-500 text-sm mt-1" />
                  </div>
                  <div className="mb-6">
                    <label className="block text-gray-600 mb-2">
                      Review (optional)
                    </label>
                    <Field
                      as="textarea"
                      name="reviewDes"
                      className={`w-full resize-none p-3 border-solid bg-white text-gray-700 rounded border ${
                        errors.reviewDes && touched.reviewDes 
                          ? "border-red-500 focus:ring-red-500"
                          : "border-gray-300 focus:ring-blue-600"
                      } focus:outline-none focus:ring-2 focus:border-transparent`}
                      placeholder="Describe your trip experience"
                    />
                    <ErrorMessage name="reviewDes" component="div" className="text-red-500 text-sm mt-1" />
                  </div>
                  <div className="mb-6">
                    <label className="block text-gray-600 mb-2">
                      Location Visited*
                    </label>
                    <Field
                      type="text"
                      name="locationVisited"
                      className={`w-full p-3 border-solid bg-white text-gray-700 rounded border ${
                        errors.locationVisited && touched.locationVisited 
                          ? "border-red-500 focus:ring-red-500"
                          : "border-gray-300 focus:ring-blue-600"
                      } focus:outline-none focus:ring-2 focus:border-transparent`}
                      placeholder="Enter location"
                    />
                    <ErrorMessage name="locationVisited" component="div" className="text-red-500 text-sm mt-1" />
                  </div>
                  <div className="mb-6">
                    <label className="block text-gray-600 mb-2">Ratings*</label>
                    <Field
                      as="select"
                      name="rating"
                      className={`w-full p-3 border-solid bg-white text-gray-700 rounded border ${
                        errors.rating && touched.rating 
                          ? "border-red-500 focus:ring-red-500"
                          : "border-gray-300 focus:ring-blue-600"
                      } focus:outline-none focus:ring-2 focus:border-transparent`}
                    >
                      <option value="5">5 stars</option>
                      <option value="4">4 stars</option>
                      <option value="3">3 stars</option>
                      <option value="2">2 stars</option>
                      <option value="1">1 star</option>
                    </Field>
                    <ErrorMessage name="rating" component="div" className="text-red-500 text-sm mt-1" />
                  </div>
                  <div className="mb-6">
                    <label className="block text-gray-600 mb-2">
                      Trip Duration (days)*
                    </label>
                    <Field
                      type="number"
                      name="duration"
                      className={`w-full p-3 border-solid bg-white text-gray-700 rounded border ${
                        errors.duration && touched.duration 
                          ? "border-red-500 focus:ring-red-500"
                          : "border-gray-300 focus:ring-blue-600"
                      } focus:outline-none focus:ring-2 focus:border-transparent`}
                      placeholder="e.g. 7"
                      min="1"
                    />
                    <ErrorMessage name="duration" component="div" className="text-red-500 text-sm mt-1" />
                  </div>
                  <div className="mb-6">
                    <label className="block text-gray-600 mb-2">
                      Trip Dates (optional)
                    </label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-gray-600 mb-2">
                          Start Date
                        </label>
                        <div className="relative">
                          <Field
                            type="date"
                            name="startDate"
                            className={`w-full p-3 border-solid bg-white text-gray-700 rounded border ${
                              errors.startDate && touched.startDate 
                                ? "border-red-500 focus:ring-red-500"
                                : "border-gray-300 focus:ring-blue-600"
                            } focus:outline-none focus:ring-2 focus:border-transparent`}
                          />
                          <i className="fas fa-calendar-alt absolute right-3 top-3 border-solid text-gray-400"></i>
                        </div>
                        <ErrorMessage name="startDate" component="div" className="text-red-500 text-sm mt-1" />
                      </div>
                      <div>
                        <label className="block text-gray-600 mb-2">End Date</label>
                        <div className="relative">
                          <Field
                            type="date"
                            name="endDate"
                            className={`w-full p-3 border-solid bg-white text-gray-700 rounded border ${
                              errors.endDate && touched.endDate 
                                ? "border-red-500 focus:ring-red-500"
                                : "border-gray-300 focus:ring-blue-600"
                            } focus:outline-none focus:ring-2 focus:border-transparent`}
                          />
                          <i className="fas fa-calendar-alt absolute right-3 top-3 border-solid text-gray-400"></i>
                        </div>
                        <ErrorMessage name="endDate" component="div" className="text-red-500 text-sm mt-1" />
                      </div>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 disabled:bg-blue-400"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Submitting..." : "Submit Review"}
                  </button>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      {/* Main end */}
    </>
  );
}

export default WriteReview;