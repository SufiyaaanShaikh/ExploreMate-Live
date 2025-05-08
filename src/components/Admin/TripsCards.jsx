import { FaTrash } from "react-icons/fa6";
import { motion } from "framer-motion";
import api from "../../config/axiosConfig";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const TripsTable = () => {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await api.get("/trips/all");
      if (response?.data && response?.data.data) {
        // Transform API response to match our UI format
        const formattedTrips = response?.data.data.map(trip => ({
          id: trip._id,
          destination: trip.destination,
          duration: trip.duration,
          date: formatTripDate(trip.startDate, trip.endDate),
          type: trip.group || 'Solo',
          creator: trip.user?.name || 'Unknown',
        }));
        setTrips(formattedTrips);
      } else {
        console.error("Unexpected response format:", response.data);
        toast.error("Failed to parse trips data");
      }
    } catch (error) {
      console.error("Error fetching trips:", error);
      toast.error(error.response?.data?.message || "Failed to load trips");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const formatTripDate = (startDate, endDate) => {
    if (!startDate) return "No date specified";
    
    const start = new Date(startDate).toISOString().split('T')[0];
    if (!endDate) return start;
    
    const end = new Date(endDate).toISOString().split('T')[0];
    return `${start} to ${end}`;
  };

  const handleDeleteTrip = async (id) => {
    try {
      await api.delete(`/trips/${id}`);
      toast.success("Trip deleted successfully");
      // Refresh the list after deletion
      fetchData();
    } catch (error) {
      console.error("Error deleting trip:", error);
      toast.error(error.response?.data?.message || "Failed to delete trip");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col h-full"
    >
      <h2 className="text-xl font-semibold mb-4">Manage Trips</h2>
      
      {loading ? (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-gray-500">Loading trips...</p>
        </div>
      ) : trips.length === 0 ? (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-gray-500">No trips found</p>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto pr-2 -mr-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {trips.map((trip) => (
              <div
                key={trip.id}
                className="bg-[#dee7ff] p-4 rounded-lg shadow-md flex flex-col"
              >
                <div className="flex justify-between mb-2">
                  <p className="font-semibold truncate">{trip.destination}</p>
                  <button 
                    className="bg-red-500 text-white p-2 rounded hover:bg-red-600 transition-colors"
                    onClick={() => handleDeleteTrip(trip.id)}
                  >
                    <FaTrash />
                  </button>
                </div>
                <p className="text-gray-700 text-sm">By: {trip.creator}</p>
                <p className="text-gray-600 text-sm">{trip.date}</p>
                <p className="text-gray-600 text-sm">{trip.duration} • {trip.type}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default TripsTable;