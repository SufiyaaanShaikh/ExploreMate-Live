import React from "react";
import { Link } from "react-router-dom";
import { FiX, FiEdit, FiTrash2, FiMapPin, FiCalendar, FiClock } from "react-icons/fi";

function WikiDetails({ destination, onClose, onDelete }) {
  // Prevent clicks inside the modal from closing it
  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  if (!destination) return null;

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-xl shadow-xl overflow-hidden w-full max-w-4xl max-h-[90vh] flex flex-col md:flex-row"
        onClick={handleModalClick}
      >
        {/* Close button */}
        <button
          className="absolute top-4 right-4 bg-white rounded-full p-1 shadow-md hover:bg-gray-100 z-10"
          onClick={onClose}
        >
          <FiX size={24} className="text-gray-600" />
        </button>

        {/* Image section */}
        <div className="md:w-1/2 h-72 md:h-auto relative">
          {destination.DestinationPhoto ? (
            <img
              src={destination.DestinationPhoto}
              alt={destination.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-100 flex items-center justify-center">
              <span className="text-gray-400 text-lg">No image available</span>
            </div>
          )}
        </div>

        {/* Content section */}
        <div className="md:w-1/2 p-6 overflow-y-auto">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-2xl font-bold text-gray-800">{destination.name}</h2>
            <div className="flex space-x-3">
              <Link to={`/edit-wiki/${destination._id}`}>
                <button className="text-blue-500 hover:text-blue-700 transition-colors">
                  <FiEdit size={20} />
                </button>
              </Link>
              <button
                className="text-red-500 hover:text-red-700 transition-colors"
                onClick={() => {
                  onDelete(destination._id);
                  onClose();
                }}
              >
                <FiTrash2 size={20} />
              </button>
            </div>
          </div>

          <div className="mb-6">
            <div className="flex items-center text-gray-700 mb-3">
              <FiMapPin size={18} className="mr-2 text-blue-500" />
              <span className="font-medium">{destination.location}</span>
            </div>

            <div className="flex flex-wrap gap-4 mb-4">
              <div className="flex items-center text-gray-700">
                <FiCalendar size={18} className="mr-2 text-green-500" />
                <div>
                  <p className="text-sm text-gray-500">Best Time to Visit</p>
                  <p className="font-medium">{destination.bestTimeToVisit}</p>
                </div>
              </div>

              <div className="flex items-center text-gray-700">
                <FiClock size={18} className="mr-2 text-orange-500" />
                <div>
                  <p className="text-sm text-gray-500">Travel Duration</p>
                  <p className="font-medium">{destination.travelDuration}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">About this destination</h3>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-700 whitespace-pre-line">{destination.description}</p>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-gray-200">
            <button
              onClick={onClose}
              className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WikiDetails;