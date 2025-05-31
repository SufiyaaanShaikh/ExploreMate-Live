import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Modal from "../Modal";
import { Link, useLocation, useParams } from "react-router-dom";
import api from "../../../config/axiosConfig";
import toast from "react-hot-toast";
import { FaTrash } from "react-icons/fa";
import DeleteConfirmationModal from "./DeleteConfirmationModal";

function TripsTab({setTrips, trips}) {
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [tripToDelete, setTripToDelete] = useState(null);
  
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const params = useParams();
  
  // Determine if this is the current user's profile or another user's profile
  const isProfilePage = location.pathname === "/profile";
  const viewingUserId = params.id; // This will be undefined for the current user's profile
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  // Fetch trips on component mount
  useEffect(() => {
    fetchTrips();
  }, [viewingUserId]);

  const fetchTrips = async () => {
    setLoading(true);
    try {
      let response;
      
      if (viewingUserId) {
        // Fetch trips for specific user if on another user's profile
        response = await api.get(`/trips/user/${viewingUserId}`);
      } else {
        // Fetch current user's trips
        response = await api.get("/trips");
      }
      
      if (response.data && response.data.data) {
        // Transform API response to match our UI format
        const formattedTrips = response.data.data.map(trip => ({
          id: trip._id,
          destination: trip.destination,
          duration: trip.duration,
          startDate: trip.startDate,
          endDate: trip.endDate,
          date: formatTripDate(trip.startDate, trip.endDate),
          description: trip.tripType || trip.description,
        }));
        setTrips(formattedTrips);
      } else {
        console.error("Unexpected response format:", response.data);
        toast.error("Failed to parse trips data");
      }
    } catch (error) {
      console.error("Error fetching trips:", error);
      toast.error("Failed to load trips");
    } finally {
      setLoading(false);
    }
  };

  // Format date for display
  const formatTripDate = (startDate, endDate) => {
    if (!startDate) return "No date specified";
    
    const start = new Date(startDate).toISOString().split('T')[0];
    if (!endDate) return start;
    
    const end = new Date(endDate).toISOString().split('T')[0];
    return `${start} to ${end}`;
  };

  const handleAddTrip = (newTrip) => {
    setTrips([newTrip, ...trips]);
    setShowModal(false);
  };

  const handleDeleteClick = (trip) => {
    setTripToDelete(trip);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (!tripToDelete) return;
    
    try {
      await api.delete(`/trips/${tripToDelete.id}`);
      
      // Remove the deleted trip from state
      const updatedTrips = trips.filter(trip => trip.id !== tripToDelete.id);
      setTrips(updatedTrips);
      
      toast.success("Trip deleted successfully");
    } catch (error) {
      console.error("Error deleting trip:", error);
      toast.error("Failed to delete trip");
    } finally {
      setShowDeleteModal(false);
      setTripToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setTripToDelete(null);
  };

  return (
    <motion.div
      className="tab-content"
      initial="hidden"
      animate="visible"
      variants={fadeInVariants}
    >
      <h3 className="text-lg font-semibold mb-4 text-center">
        {trips.length === 0 && !loading
          ? "No trips found. Add your first trip!"
          : isProfilePage ? "Your Trips" : "User's Trips"}
       
      </h3>
      
      {loading ? (
        <div className="flex justify-center items-center py-10">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <motion.div
          className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4"
          variants={containerVariants}
        >
          {isProfilePage && (
            <motion.div
              className="bg-white shadow-sm p-4 rounded-xl h-44 border grid place-content-center border-solid border-gray-100 cursor-pointer"
              variants={itemVariants}
              whileHover={{
                scale: 1.03,
                boxShadow: "0px 5px 15px rgba(0,0,0,0.1)",
              }}
              onClick={() => setShowModal(true)}
            >
              <div className="flex flex-col items-center justify-center">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                </div>
                <p className="text-sm font-medium">Add New Trip</p>
              </div>
            </motion.div>
          )}

          {trips.length === 0 && !loading ? (
            <div className="col-span-full text-center py-8 text-gray-500">
              {isProfilePage ? "" : "This user hasn't added any trips yet."}
            </div>
          ) : (
            trips.map((trip) => (
              <motion.div
                key={trip.id}
                className="bg-white shadow-sm p-4 h-44 rounded-xl border border-solid border-gray-100 relative"
                variants={itemVariants}
                whileHover={{
                  scale: 1.03,
                  boxShadow: "0px 5px 15px rgba(0,0,0,0.1)",
                }}
              >
                {isProfilePage && (
                  <button 
                    className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition-colors"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteClick(trip);
                    }}
                  >
                    <FaTrash />
                  </button>
                )}
                <h4 className="trip-title text-xl font-semibold">{trip.destination}</h4>
                <p className="text-sm text-gray-500">Duration: {trip.duration}</p>
                <p className="text-sm text-gray-500">Date: {trip.date}</p>
                <p className="trip-des text-sm text-gray-500">description: {trip.description}</p>
                <Link to={`/trip/${trip.id}`}>
                  <motion.button
                    className="mt-3 w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition duration-300"
                    whileTap={{ scale: 0.95 }}
                    onClick={() => toast(`Viewing details for ${trip.destination}`, {
                      icon: '🔎',
                    })}
                  >
                    View Details
                  </motion.button>
                </Link>
              </motion.div>
            ))
          )}
        </motion.div>
      )}

      {isProfilePage && (
        <Modal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onAddTrip={handleAddTrip}
        />
      )}

      {showDeleteModal && tripToDelete && (
        <DeleteConfirmationModal
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
          modalType="Trip"
        />
      )}
    </motion.div>
  );
}

export default TripsTab;