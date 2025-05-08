import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLocation, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa"; // Import trash icon
import api from "../../../config/axiosConfig";
import toast from "react-hot-toast";
import MainReviewCards from "../../Home/MainReviewCards";
import DeleteConfirmationModal from "./DeleteConfirmationModal";

// Image import context - moved from MainReviewCards
const images = require.context("../../../images", false, /\.(png|jpe?g|svg|webp)$/);

function ReviewsTab() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [reviewToDelete, setReviewToDelete] = useState(null);
  const location = useLocation();
  const params = useParams();

  // Determine if this is the current user's profile or another user's profile
  const isProfilePage = location.pathname === "/profile";
  const viewingUserId = params.id; // This will be undefined for the current user's profile
  const isCurrentUserProfile = !viewingUserId; // If no userId in params, it's the current user's profile

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

  // Fetch reviews on component mount
  useEffect(() => {
    fetchReviews();
  }, [viewingUserId]);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      let response;

      if (viewingUserId) {
        // Fetch reviews for specific user if on another user's profile
        response = await api.get(`/review/user/${viewingUserId}`);
      } else {
        // Fetch current user's review
        response = await api.get("/review/me");
      }

      if (response.data && response.data.data) {
        setReviews(response.data.data);
      } else {
        console.error("Unexpected response format:", response.data);
        toast.error("Failed to parse reviews data");
        setReviews([]);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
      toast.error("Failed to load reviews");
      setReviews([]);
    } finally {
      setLoading(false);
    }
  };

  // Handle delete button click
  const handleDeleteClick = (reviewId) => {
    setReviewToDelete(reviewId);
    setShowDeleteModal(true);
  };

  // Handle delete confirmation
  const handleDeleteConfirm = async () => {
    if (!reviewToDelete) return;
    
    try {
      await api.delete(`/review/${reviewToDelete}`);
      toast.success("Review deleted successfully");
      // Refresh reviews after deletion
      fetchReviews();
    } catch (error) {
      console.error("Error deleting review:", error);
      toast.error(error.response?.data?.message || "Failed to delete review");
    } finally {
      setShowDeleteModal(false);
      setReviewToDelete(null);
    }
  };

  // Handle delete cancellation
  const handleDeleteCancel = () => {
    setShowDeleteModal(false);
    setReviewToDelete(null);
  };

  return (
    <>
      <section id="main-review" className="vh-70 position">
        <div className="vh-70 flex justify-content items-center">
          {loading ? (
            <div className="container flex justify-center items-center">
              <p>Loading reviews...</p>
            </div>
          ) : reviews.length > 0 ? (
            <motion.div 
              className="container reviewTab flex justify-center flex-wrap"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {isCurrentUserProfile ? (
                // Custom rendering for logged-in user's own reviews (with delete button)
                reviews.map((review) => {
                  const reviewId = review._id;
                  const reviewLink = `/single-review/${reviewId}`;
                  const imageSource = review.reviewPhoto || images('./placeholder.webp');
                  const locationText = review.locationVisited;
                  const descriptionText = review.reviewDes;
                  
                  return (
                    <div className="card grid relative" key={reviewId}>
                      {/* Delete icon */}
                      <motion.div 
                        className="absolute top-2 right-2 z-10 cursor-pointer bg-white p-2 rounded-full shadow-md" 
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleDeleteClick(reviewId);
                        }}
                      >
                        <FaTrash className="text-red-500" />
                      </motion.div>

                      <Link to={reviewLink}>
                        <div className="img-block h-100">
                          <img
                            src={imageSource}
                            alt={review.title || "Review image"}
                            className="h-100 w-100"
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = images('./placeholder.jpg');
                            }}
                          />
                        </div>
                      </Link>
                      <div className="content">
                        <div className="content-title flex">
                          <h5>{review.title}</h5>
                          <div className="rating flex items-center">
                            <p>{review.rating}</p>
                            <img src={images("./check-star.svg")} alt="star" />
                          </div>
                        </div>
                        <p className="para-c para-f">{locationText}</p>
                        <div className="para">
                          {descriptionText && descriptionText.length > 150 
                            ? `${descriptionText.substring(0, 150)}...` 
                            : descriptionText}
                        </div>
                        <span>
                          <Link to={reviewLink} className="read para-c">
                            read more...
                          </Link>
                        </span>
                      </div>
                    </div>
                  );
                })
              ) : (
                // For other users' profiles, use the standard MainReviewCards component
                <MainReviewCards reviewData={reviews} />
              )}
            </motion.div>
          ) : (
            <div className="container flex justify-center items-center">
              <p>No reviews found.</p>
            </div>
          )}
        </div>
      </section>

      {/* Delete confirmation modal */}
      {showDeleteModal && (
        <DeleteConfirmationModal
          onConfirm={handleDeleteConfirm}
          onCancel={handleDeleteCancel}
          modalType="Review"
        />
      )}
    </>
  );
}

export default ReviewsTab;