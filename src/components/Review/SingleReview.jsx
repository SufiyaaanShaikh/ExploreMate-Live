import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import api from "../../config/axiosConfig";
import toast from "react-hot-toast";

// Icons
import {
  FaCalendarAlt,
  FaMapMarkerAlt,
  FaStar,
  FaClock,
  FaArrowLeft,
  FaUser,
} from "react-icons/fa";
import Footer from "../Footer";
import Header from "../Header";

function SingleReview() {
  const { reviewId } = useParams();
  const navigate = useNavigate();
  const [review, setReview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the review data when component mounts
    fetchReviewData();
  }, [reviewId]);

  const fetchReviewData = async () => {
    if (!reviewId) {
      setError("Review ID is missing");
      setLoading(false);
      return;
    }

    try {
      const response = await api.get(`/review/${reviewId}`);

      if (response.data && response.data.data) {
        setReview(response.data.data);
      } else {
        setError("Failed to load review details");
      }
    } catch (err) {
      console.error("Error fetching review:", err);
      setError(
        err.response?.data?.message ||
          "An error occurred while loading the review"
      );
      toast.error("Failed to load review details");
    } finally {
      setLoading(false);
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "Not specified";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Generate star rating display
  const renderStarRating = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);

    for (let i = 0; i < 5; i++) {
      if (i < fullStars) {
        stars.push(<FaStar key={i} className="text-yellow-400" />);
      } else {
        stars.push(<FaStar key={i} className="text-gray-300" />);
      }
    }

    return (
      <div className="flex items-center">
        {stars}
        <span className="ml-2 text-gray-700">({rating}/5)</span>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-pulse text-lg">Loading review...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <div className="bg-red-100 text-red-800 p-4 rounded-lg mb-4">
          {error}
        </div>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          <FaArrowLeft className="mr-2" /> Go Back
        </button>
      </div>
    );
  }

  if (!review) {
    return (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <div className="text-xl mb-4">Review not found</div>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          <FaArrowLeft className="mr-2" /> Go Back
        </button>
      </div>
    );
  }
  return (
    <>
    <Header/>
    <div id="singReviewContainer" className="container mx-auto px-4 py-8 max-w-6xl position bg-white mt-24 mb-[23rem]">
      {/* Breadcrumbs Navigation */}
      <div className="flex items-center text-sm mb-6">
        <Link to="/" className="text-blue-600 hover:underline">
          Home
        </Link>
        <span className="mx-2">›</span>
        <Link to="/review" className="text-blue-600 hover:underline">
          Reviews
        </Link>
        <span className="mx-2">›</span>
        <span className="text-gray-600">{review.title}</span>
      </div>

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition mb-6"
      >
        <FaArrowLeft className="mr-2" /> Go Back
      </button>

      {/* Review Header */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
        <div className="relative">
          {/* Review Image */}
          {review.reviewPhoto ? (
            <div className="w-full h-96 relative">
              <img
                src={review.reviewPhoto}
                alt={review.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            </div>
          ) : (
            <div className="w-full h-64 bg-blue-400 flex items-center justify-center">
              <span className="text-slate-800">No image available</span>
            </div>
          )}

          {/* Title overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              {review.title}
            </h1>
            <div className="flex items-center">
              <FaMapMarkerAlt className="mr-2" />
              <span>{review.locationVisited}</span>
            </div>
          </div>
        </div>

        {/* Review Details */}
        <div className="p-6">
          {/* Author info */}
          {review.user && (
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                {review.user.profilePhoto ? (
                  <img
                    src={review.user.profilePhoto}
                    alt={review.user.username}
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <FaUser className="text-gray-500 text-xl" />
                )}
              </div>
              <div>
                <div className="font-semibold">
                  {review.user.name || "Anonymous User"}
                </div>
                <div className="text-gray-500 text-sm">
                  Posted on {new Date(review.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>
          )}

          {/* Rating and stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-gray-500 mb-1 flex items-center">
                <FaStar className="mr-2" /> Rating
              </div>
              <div>{renderStarRating(review.rating)}</div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-gray-500 mb-1 flex items-center">
                <FaClock className="mr-2" /> Duration
              </div>
              <div>
                {review.duration} day{review.duration !== 1 ? "s" : ""}
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="text-gray-500 mb-1 flex items-center">
                <FaCalendarAlt className="mr-2" /> Trip Dates
              </div>
              <div className="text-sm">
                {review.startDate ? (
                  <>
                    {formatDate(review.startDate)}
                    {review.endDate && ` - ${formatDate(review.endDate)}`}
                  </>
                ) : (
                  "Not specified"
                )}
              </div>
            </div>
          </div>

          {/* Review text */}
          {review.reviewDes && (
            <div className="mb-8">
              <h2 className="text-xl font-semibold mb-4">Review</h2>
              <div className="text-gray-700 whitespace-pre-line">
                {review.reviewDes}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related reviews section would go here */}
    </div>
    <Footer/>
    </>
  );
}

export default SingleReview;
