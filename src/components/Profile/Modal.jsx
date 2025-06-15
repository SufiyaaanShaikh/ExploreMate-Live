import { useRef, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import api from "../../config/axiosConfig";
import toast from "react-hot-toast";
import TripSchema from "../../schemas/tripSchema";



const Modal = ({ isOpen, onClose, onAddTrip }) => {
  const modalRef = useRef(null);

  // Initial form values
  const initialValues = {
    title: "",
    description: "",
    destination: "",
    duration: "",
    startDate: "",
    endDate: "",
    group: "Solo"
  };

  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  // Handle form submission
  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await api.post("/trips", {
        title: values.title,
        description: values.description,
        destination: values.destination,
        duration: values.duration,
        startDate: values.startDate || undefined,
        endDate: values.endDate || undefined,
        group: values.group
      });

      if (response.data && response.data.data) {
        toast.success("Trip added successfully!");
        
        // Format date for display
        let displayDate = values.startDate;
        if (values.startDate && values.endDate) {
          displayDate = `${values.startDate} to ${values.endDate}`;
        }
        
        // Create trip object for UI update
        const newTrip = {
          id: response.data.data._id,
          destination: values.destination,
          duration: values.duration,
          date: displayDate || new Date().toISOString().split('T')[0],
          description: values.description  // Changed from type: values.destination
        };
        
        // Call the onAddTrip function passed from parent
        if (onAddTrip) {
          onAddTrip(newTrip);
        }
        
        // Reset form
        resetForm();
      }
    } catch (error) {
      console.error("Error adding trip:", error);
      toast.error(error.response?.data?.message || "Failed to add trip");
    } finally {
      setSubmitting(false);
    }
  };

  // Add event listener for escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    window.addEventListener('keydown', handleEscape);
    return () => {
      window.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 overflow-auto"
      onClick={handleClickOutside}
    >
      <div
        ref={modalRef}
        className="bg-white model-block p-6 rounded-lg shadow-lg max-w-2xl w-full mt-12 m-4"
      >
        <h2 className="text-xl font-bold mb-6 text-center">Add New Trip</h2>
        
        <Formik
          initialValues={initialValues}
          validationSchema={TripSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting, touched, errors }) => (
            <Form className="tripAddForm">
              <div className="mb-4 input-block">
                <label className="block text-gray-600 mb-2">
                  Trip Title
                </label>
                <Field
                  type="text"
                  name="title"
                  className={`w-full p-3 border-solid bg-white text-gray-700 rounded border ${
                    touched.title && errors.title ? 'border-red-500' : 'border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent`}
                  placeholder="Enter trip title"
                />
                <ErrorMessage name="title" component="div" className="text-red-500 mt-1 text-sm" />
              </div>
              
              <div className="mb-4 input-block">
                <label className="block text-gray-600 mb-2">
                  Description
                </label>
                <Field
                  as="textarea"
                  name="description"
                  className="w-full resize-none p-3 border-solid bg-white text-gray-700 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent h-24"
                  placeholder="Description of the trip"
                />
                <ErrorMessage name="description" component="div" className="text-red-500 mt-1 text-sm" />
              </div>
              
              <div className="mb-4 input-block">
                <label className="block text-gray-600 mb-2">
                  Destination
                </label>
                <Field
                  type="text"
                  name="destination"
                  className={`w-full p-3 border-solid bg-white text-gray-700 rounded border ${
                    touched.destination && errors.destination ? 'border-red-500' : 'border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent`}
                  placeholder="Enter destination"
                />
                <ErrorMessage name="destination" component="div" className="text-red-500 mt-1 text-sm" />
              </div>
              
              <div className="mb-4 input-block">
                <label className="block text-gray-600 mb-2">Group</label>
                <Field
                  as="select"
                  name="group"
                  className="w-full p-3 border-solid bg-white text-gray-700 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                >
                  <option value="Solo">Solo</option>
                  <option value="Duo">Duo</option>
                  <option value="Trio">Trio</option>
                  <option value="Friends">Friends</option>
                  <option value="Family">Family</option>
                </Field>
                <ErrorMessage name="group" component="div" className="text-red-500 mt-1 text-sm" />
              </div>
              
              <div className="mb-4 input-block">
                <label className="block text-gray-600 mb-2">
                  Trip Duration
                </label>
                <Field
                  type=" number"
                  name="duration"
                  className={`w-full p-3 border-solid bg-white text-gray-700 rounded border ${
                    touched.duration && errors.duration ? 'border-red-500' : 'border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent`}
                  placeholder="e.g. 7 Days"
                />
                <ErrorMessage name="duration" component="div" className="text-red-500 mt-1 text-sm" />
              </div>
              
              <div className="mb-4 input-block">
                <label className="block text-gray-600 mb-2">
                  Trip Dates
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-gray-600 mb-2">
                      Start Date
                    </label>
                    <Field
                      type="date"
                      name="startDate"
                      className="w-full p-3 border-solid bg-white text-gray-700 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    />
                    <ErrorMessage name="startDate" component="div" className="text-red-500 mt-1 text-sm" />
                  </div>
                  <div>
                    <label className="block text-gray-600 mb-2">
                      End Date
                    </label>
                    <Field
                      type="date"
                      name="endDate"
                      className="w-full p-3 border-solid bg-white text-gray-700 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    />
                    <ErrorMessage name="endDate" component="div" className="text-red-500 mt-1 text-sm" />
                  </div>
                </div>
              </div>
              
              <div className="flex gap-3 input-block">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-1/2 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition duration-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300 disabled:bg-blue-400"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Adding..." : "Add Trip"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Modal;