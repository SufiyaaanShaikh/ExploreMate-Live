import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast, { Toaster } from "react-hot-toast";
import { GoUpload } from "react-icons/go";
import { useParams, useNavigate } from "react-router-dom";
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
});

function EditWiki() {
  const { destinationId } = useParams();
  const navigate = useNavigate();
  const [destination, setDestination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imageUrl, setImageUrl] = useState("");
  const [newImageFile, setNewImageFile] = useState(null);

  useEffect(() => {
    fetchDestination();
    
    // Clean up any object URLs to avoid memory leaks
    return () => {
      if (imageUrl && imageUrl.startsWith('blob:')) {
        URL.revokeObjectURL(imageUrl);
      }
    };
  }, [destinationId]);

  const fetchDestination = async () => {
    try {
      const response = await api.get(`/destination/${destinationId}`);
      if (response.data.success) {
        const fetchedDestination = response.data.data;
        setDestination(fetchedDestination);
        setImageUrl(fetchedDestination.DestinationPhoto || "");
        setLoading(false);
      } else {
        toast.error("Failed to fetch destination");
        navigate("/display-wiki");
      }
    } catch (error) {
      console.error("Error fetching destination:", error);
      toast.error("Destination not found");
      navigate("/display-wiki");
    }
  };

  // Handle image upload
  const handleImageUpload = (setFieldValue, event) => {
    const file = event.target.files[0];
    if (file) {
      // Revoke the old object URL if it exists
      if (imageUrl && imageUrl.startsWith('blob:')) {
        URL.revokeObjectURL(imageUrl);
      }
      
      // Create new object URL and store the file
      const newImageUrl = URL.createObjectURL(file);
      setImageUrl(newImageUrl);
      setNewImageFile(file);
    }
  };

  // Submit handler
  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const formData = new FormData();
      
      // Add text fields
      formData.append("name", values.name);
      formData.append("description", values.description);
      formData.append("location", values.location);
      formData.append("bestTimeToVisit", values.bestTimeToVisit);
      formData.append("travelDuration", values.travelDuration);

      // Only add image if a new one was selected
      if (newImageFile) {
        formData.append("destinationPhoto", newImageFile);
      }

      const response = await api.put(`/destination/${destinationId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      
      if (response.data.success) {
        toast.success("Destination updated successfully", {
          position: "top-center",
        });
        setTimeout(() => {
          navigate("/display-wiki");
        }, 1500);
      } else {
        toast.error(response.data.message || "Update failed");
      }
    } catch (error) {
      console.error("Submission error:", error);
      const errorMessage = error.response?.data?.message || "Failed to update destination";
      toast.error(errorMessage);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="w-2/3 mx-auto p-8 bg-white shadow-xl rounded-xl border border-gray-100">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-2/3 mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
          
          <div className="h-56 bg-gray-200 rounded-lg mb-6"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="h-12 bg-gray-200 rounded"></div>
            <div className="h-12 bg-gray-200 rounded"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="h-12 bg-gray-200 rounded"></div>
            <div className="h-12 bg-gray-200 rounded"></div>
          </div>
          
          <div className="h-32 bg-gray-200 rounded mb-8"></div>
          <div className="h-12 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (!destination) {
    return (
      <div className="w-2/3 mx-auto p-8 bg-white shadow-xl rounded-xl border border-gray-100">
        <p className="text-center text-red-500">Destination not found</p>
      </div>
    );
  }

  // Initial form values from the destination
  const initialValues = {
    name: destination.name || "",
    description: destination.description || "",
    location: destination.location || "",
    bestTimeToVisit: destination.bestTimeToVisit || "",
    travelDuration: destination.travelDuration || ""
  };

  return (
    <div className="w-2/3 mx-auto p-8 bg-white shadow-xl rounded-xl border border-gray-100">
      <Toaster position="top-right" />
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-extrabold text-gray-800">
          Edit Destination
        </h2>
        <p className="text-gray-600 mt-2">
          Update details for "{destination.name}"
        </p>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={DestinationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
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
                      imageUrl
                        ? "border-blue-400 bg-blue-50"
                        : "border-gray-300 hover:border-blue-400 hover:bg-gray-50"
                    }`}
                  >
                    {imageUrl ? (
                      <img
                        src={imageUrl}
                        alt="Destination"
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
                          imageUrl ? "text-blue-600" : "text-gray-500"
                        }`}
                      >
                        {imageUrl
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
                  />
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Destination Name */}
              <div className="form-group h-20">
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

            {/* Action Buttons */}
            <div className="form-group pt-4 grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => navigate("/display-wiki")}
                className="w-full bg-gray-100 text-gray-800 py-3 px-4 rounded-lg hover:bg-gray-200 shadow-md transition duration-300 font-medium text-lg"
              >
                Cancel
              </button>
              
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
                    Updating...
                  </>
                ) : (
                  <>Update Destination</>
                )}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default EditWiki;