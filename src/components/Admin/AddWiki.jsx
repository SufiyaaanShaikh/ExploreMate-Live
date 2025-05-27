import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast, { Toaster } from "react-hot-toast";
import { GoUpload } from "react-icons/go";
import api from "../../config/axiosConfig";

// Validation Schema
const DestinationSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Destination name must be at least 3 characters")
    .max(100, "Destination name cannot exceed 100 characters")
    .required("Destination name is required"),

  description: Yup.string()
    .min(20, "Description must be at least 20 characters")
    .max(1000, "Description cannot exceed 1000 characters")
    .required("Description is required"),

  location: Yup.string().required("Location is required"),

  bestTimeToVisit: Yup.string().required("Best time to visit is required"),

  travelDuration: Yup.string().required("Travel duration is required"),
  image: Yup.mixed()
    .required("Image is required")
    .test("fileType", "Unsupported file format", (value) => {
      return (
        value && ["image/jpeg", "image/png", "image/jpg"].includes(value.type)
      );
    }),
});
function AddWiki() {
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    return () => {
      if (imageUrl) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [imageUrl]);

  // Initial form values
  const initialValues = {
    name: "",
    description: "",
    location: "",
    bestTimeToVisit: "",
    travelDuration: "",
    image: null,
  };

  // Handle image upload
  const handleImageUpload = (setFieldValue, event) => {
    const file = event.target.files[0];
    if (file) {
      setImageUrl(URL.createObjectURL(file)); // Set local preview URL
      setFieldValue("image", file);
    }
  };

  // Submit handler
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const formData = new FormData();
      Object.keys(values).forEach((key) => {
        formData.append(key, values[key]);
      });

      // Rename image field to match the backend's expected field name
      if (values.image) {
        formData.delete("image");
        formData.append("destinationPhoto", values.image);
      }

      const response = await api.post(`/destination/add`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      if (response.data.success) {
        toast.success(" Destination added successfully", {
          position: "top-center",
        });
        resetForm();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Failed to add destination. Please try again.");
      console.error("Submission error:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-2/3 mx-auto p-8 bg-white shadow-xl rounded-xl border border-gray-100">
      <Toaster position="top-right" />
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-extrabold text-gray-800">
          Add New Destination
        </h2>
        <p className="text-gray-600 mt-2">
          Share a beautiful travel destination with the world
        </p>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={DestinationSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, values, isSubmitting }) => (
          <Form className="space-y-6">
            {/* Image Upload */}
            <div className="form-group">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Destination Image
              </label>
              <div className="mt-1 flex justify-center">
                <label htmlFor="image" className="cursor-pointer w-full">
                  <div
                    className={`border-2 border-dashed rounded-lg p-2 transition-all ${
                      values.image
                        ? "border-blue-400 bg-blue-50"
                        : "border-gray-300 hover:border-blue-400 hover:bg-gray-50"
                    }`}
                  >
                    {values.image ? (
                      <img
                        src={imageUrl}
                        alt="Upload"
                        className="h-56 w-full object-cover rounded-lg shadow-md"
                      />
                    ) : (
                      <div className="h-56 w-full flex items-center justify-center text-gray-400">
                        <GoUpload className="text-6xl" />
                      </div>
                    )}

                    <div className="mt-2 text-center">
                      <p
                        className={`text-sm ${
                          values.image ? "text-blue-600" : "text-gray-500"
                        }`}
                      >
                        {values.image
                          ? "Click to change image"
                          : "Click to upload an image"}
                      </p>
                    </div>
                  </div>
                  <input
                    type="file"
                    id="image"
                    name="image"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(setFieldValue, e)}
                    className="hidden"
                    required
                  />
                </label>
              </div>
              <ErrorMessage
                name="image"
                component="div"
                className="mt-2 para-f text-red-600 text-sm"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Destination Name */}
              <div className="form-group h-20 ">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Destination Name
                </label>
                <Field
                  type="text"
                  name="name"
                  className="mt-1 border-solid text-sm placeholder:text-sm block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  placeholder="Enter destination name"
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className="mt-1 para-f text-red-600 text-xs"
                />
              </div>

              {/* Location */}
              <div className="form-group h-20">
                <label
                  htmlFor="location"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Location
                </label>
                <Field
                  type="text"
                  name="location"
                  className="mt-1 border-solid text-sm placeholder:text-sm block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  placeholder="Country or specific region"
                />
                <ErrorMessage
                  name="location"
                  component="div"
                  className="mt-1 para-f text-red-600 text-xs"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Best Time to Visit */}
              <div className="form-group h-20">
                <label
                  htmlFor="bestTimeToVisit"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Best Time to Visit
                </label>
                <Field
                  type="text"
                  name="bestTimeToVisit"
                  className="mt-1 border-solid text-sm placeholder:text-sm block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  placeholder="e.g., June to September"
                />
                <ErrorMessage
                  name="bestTimeToVisit"
                  component="div"
                  className="mt-1 para-f text-red-600 text-xs"
                />
              </div>

              {/* Travel Duration */}
              <div className="form-group h-20">
                <label
                  htmlFor="travelDuration"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Travel Duration
                </label>
                <Field
                  type="text"
                  name="travelDuration"
                  className="mt-1 border-solid text-sm placeholder:text-sm block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  placeholder="e.g., 7 days, 2 weeks"
                />
                <ErrorMessage
                  name="travelDuration"
                  component="div"
                  className="mt-1 para-f text-red-600 text-xs"
                />
              </div>
            </div>

            {/* Description */}
            <div className="form-group h-44">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Description
              </label>
              <Field
                as="textarea"
                name="description"
                rows="5"
                className="mt-1 border-solid text-sm placeholder:text-sm block w-full border border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                placeholder="Describe what makes this destination special, attractions, tips for travelers..."
              />
              <ErrorMessage
                name="description"
                component="div"
                className="mt-1 para-f text-red-600 text-xs"
              />
            </div>

            {/* Submit Button */}
            <div className="form-group pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-blue-800 shadow-md hover:shadow-lg transition duration-300 font-medium text-lg flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Adding Destination...
                  </>
                ) : (
                  <>Add Destination</>
                )}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default AddWiki;
