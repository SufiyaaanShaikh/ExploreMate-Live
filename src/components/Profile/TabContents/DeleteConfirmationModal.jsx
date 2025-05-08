import React from "react";
import { motion } from "framer-motion";

function DeleteConfirmationModal({ onConfirm, onCancel, modalType = "Review" }) {
  // Animation for modal
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const modalVariants = {
    hidden: { y: "-100vh", opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", damping: 25, stiffness: 500 }
    },
  };

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
      variants={backdropVariants}
      initial="hidden"
      animate="visible"
      onClick={onCancel} // Close when clicking outside
    >
      <motion.div
        className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full mx-4"
        variants={modalVariants}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking on modal
      >
        <h3 className="text-xl font-semibold mb-4 text-gray-800">Delete {modalType}</h3>
        <p className="text-gray-600 mb-6">
          Are you sure you want to delete this {modalType.toLowerCase()}? This action cannot be undone.
        </p>

        <div className="flex justify-end space-x-3">
          <motion.button
            className="px-4 py-2 bg-gray-200 rounded-md text-gray-700 font-medium hover:bg-gray-300 transition duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onCancel}
          >
            Cancel
          </motion.button>
          <motion.button
            className="px-4 py-2 bg-red-500 rounded-md text-white font-medium hover:bg-red-600 transition duration-200"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onConfirm}
          >
            Delete
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default DeleteConfirmationModal;