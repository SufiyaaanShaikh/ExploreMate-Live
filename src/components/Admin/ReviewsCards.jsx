import { FaTrash } from "react-icons/fa6";
import { motion } from "framer-motion";
import api from "../../config/axiosConfig";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ReviewsTable = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllReviews();
  }, []);

  const fetchAllReviews = async () => {
    setLoading(true);
    try {
      const response = await api.get("/review/all");
      if (response.data && response.data.data) {
        setReviews(response.data.data);
      } else {
        console.error("Unexpected response format:", response.data);
        toast.error("Failed to load reviews");
        // Use mock data as fallback
        setReviews([]);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
      toast.error("Failed to load reviews");
      // Use mock data as fallback
      setReviews([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteReview = async (id) => {
    try {
      await api.delete(`/review/${id}`);
      toast.success("Review deleted successfully");
      // Refresh the list after deletion
      fetchAllReviews();
    } catch (error) {
      console.error("Error deleting review:", error);
      toast.error(error.response?.data?.message || "Failed to delete review");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col h-full"
    >
      <h2 className="text-xl font-semibold mb-4">Manage Reviews</h2>
      
      {loading ? (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-gray-500">Loading reviews...</p>
        </div>
      ) : reviews.length === 0 ? (
        <div className="flex-1 flex items-center justify-center">
          <p className="text-gray-500">No reviews found</p>
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto pr-2 -mr-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {reviews.map((review) => (
              <div 
                key={review._id || review.id} 
                className="bg-[#dee7ff] p-4 rounded-lg shadow-md flex justify-between items-center"
              >
                <div className="flex-1 min-w-0">
                  <p className="font-semibold truncate">{review.user?.name}</p>
                  <p className="text-gray-700 text-sm truncate">{review.title}</p>
                </div>
                <button 
                  className="bg-red-500 text-white p-2 rounded ml-2 flex-shrink-0"
                  onClick={() => handleDeleteReview(review._id)}
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default ReviewsTable;