import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../config/axiosConfig";
import toast, { Toaster } from "react-hot-toast";
import { FiEdit, FiTrash2, FiCalendar, FiClock, FiMapPin } from "react-icons/fi";
import WikiDetails from "./WikiDetails";

function DisplayWiki() {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  // Fetch all destinations on component mount
  useEffect(() => {
    fetchDestinations();
  }, []);

  // Fetch destinations from API
  const fetchDestinations = async () => {
    try {
      setLoading(true);
      const response = await api.get("/destination/all");
      if (response.data.success) {
        setDestinations(response.data.data);
      }
    } catch (error) {
      console.error("Error fetching destinations:", error);
      toast.error("Failed to load destinations");
    } finally {
      setLoading(false);
    }
  };

  // Delete destination handler
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this destination?")) {
      try {
        const response = await api.delete(`/destination/${id}`);
        if (response.data.success) {
          toast.success("Destination deleted successfully");
          fetchDestinations(); // Refresh destinations list
        }
      } catch (error) {
        console.error("Error deleting destination:", error);
        toast.error("Failed to delete destination");
      }
    }
  };

  // Open destination details modal
  const openDetailsModal = (destination) => {
    setSelectedDestination(destination);
    setShowDetailsModal(true);
  };

  // Close destination details modal
  const closeDetailsModal = () => {
    setShowDetailsModal(false);
    setSelectedDestination(null);
  };

  // Display loading skeleton while fetching data
  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-8 text-center">
          Discover Amazing Destinations
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(6)].map((_, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse">
              <div className="h-48 bg-gray-300"></div>
              <div className="p-6 space-y-4">
                <div className="h-6 bg-gray-300 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <Toaster position="top-right" />
      
      <div className="mb-8 text-center">
        <h2 className="text-3xl font-extrabold text-gray-800">
          Discover Amazing Destinations
        </h2>
        <p className="text-gray-600 mt-2">
          Explore beautiful travel spots from around the world
        </p>
      </div>

      {destinations.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 rounded-lg shadow">
          <h3 className="text-xl font-medium text-gray-700">No destinations found</h3>
          <p className="text-gray-500 mt-2">Be the first to add a travel destination!</p>
          <Link 
            to="/add-wiki" 
            className="mt-4 inline-block px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Add Destination
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {destinations.map((destination) => (
            <div key={destination._id} className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow">
              {/* Destination Image */}
              <div 
                className="h-48 bg-gray-200 overflow-hidden cursor-pointer"
                onClick={() => openDetailsModal(destination)}
              >
                {destination.DestinationPhoto ? (
                  <img 
                    src={destination.DestinationPhoto} 
                    alt={destination.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-100">
                    <span className="text-lg">No image available</span>
                  </div>
                )}
              </div>
              
              {/* Destination Content */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 
                    className="text-xl font-bold text-gray-800 cursor-pointer hover:text-blue-600"
                    onClick={() => openDetailsModal(destination)}
                  >
                    {destination.name}
                  </h3>
                  <div className="flex space-x-2">
                    <Link to={`/edit-wiki/${destination._id}`}>
                      <button className="text-blue-500 hover:text-blue-700 transition-colors">
                        <FiEdit size={18} />
                      </button>
                    </Link>
                    <button 
                      className="text-red-500 hover:text-red-700 transition-colors"
                      onClick={() => handleDelete(destination._id)}
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </div>
                </div>
                
                <div className="flex items-center text-gray-600 mb-3">
                  <FiMapPin size={16} className="mr-2" />
                  <span>{destination.location}</span>
                </div>
                
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {destination.description}
                </p>
                
                <div className="flex flex-wrap gap-3 mt-4">
                  <div className="flex items-center text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                    <FiCalendar size={14} className="mr-1" />
                    <span>{destination.bestTimeToVisit}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                    <FiClock size={14} className="mr-1" />
                    <span>{destination.travelDuration}</span>
                  </div>
                </div>
                
                <button
                  onClick={() => openDetailsModal(destination)}
                  className="mt-5 w-full py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Details Modal */}
      {showDetailsModal && selectedDestination && (
        <WikiDetails 
          destination={selectedDestination} 
          onClose={closeDetailsModal}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}

export default DisplayWiki;