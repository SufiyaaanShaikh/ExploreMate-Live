import React, { useState, useEffect } from "react";
import ReviewBlock from "./ReviewBlock";
import api from "../../config/axiosConfig";
import toast from "react-hot-toast";
import placeholder from "../../images/placeholder.webp"; // Fallback image

// Loading skeleton component
const ReviewSkeleton = () => (
  <div className="review-block grid animate-pulse">
    <div className="img-block h-100 bg-gray-200"></div>
    <div className="content grid">
      <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
      <div className="h-6 bg-gray-200 rounded w-3/4 mb-3"></div>
      <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-2/3"></div>
    </div>
  </div>
);

const ReviewContainer = () => {
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
        setReviews(getMockReviews());
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
      toast.error("Failed to load reviews");
      // Use mock data as fallback
      setReviews(getMockReviews());
    } finally {
      setLoading(false);
    }
  };

  // Helper function to get mock reviews as fallback
  const getMockReviews = () => {
    return [
      {
        _id: "1",
        title: "A Wonderful Journey to Mumbai",
        locationVisited: "Mumbai, India",
        reviewDes: "India is a diverse and fascinating country with a rich history, vibrant culture, and stunning landscapes. From the bustling cities like Delhi, Mumbai, and Kolkata, to the serene backwaters of Kerala, India offers a unique and memorable travel experience for all kinds of travelers.",
        reviewPhoto: placeholder,
        rating: 4,
        user: { username: "traveler123" }
      },
      {
        _id: "2",
        title: "Exploring the Backwaters of Kerala",
        locationVisited: "Kerala, India",
        reviewDes: "The serene backwaters of Kerala offer a peaceful retreat from the hustle and bustle of city life. The houseboat experience is truly one of a kind and should not be missed!",
        reviewPhoto: placeholder,
        rating: 5,
        user: { username: "adventureseeker" }
      },
      {
        _id: "3",
        title: "Trekking in the Himalayas",
        locationVisited: "Himachal Pradesh, India",
        reviewDes: "The Himalayan mountain ranges offer some of the most breathtaking views in the world. The trek was challenging but the experience was well worth it.",
        reviewPhoto: placeholder,
        rating: 5,
        user: { username: "mountainlover" }
      },
      {
        _id: "4",
        title: "The Majestic Taj Mahal",
        locationVisited: "Agra, India",
        reviewDes: "The Taj Mahal is even more beautiful in person than in pictures. The intricate marble work and the symmetry of the structure are truly a marvel of architecture.",
        reviewPhoto: placeholder,
        rating: 4,
        user: { username: "historyenthusiast" }
      },
      {
        _id: "5",
        title: "Golden Temple Experience",
        locationVisited: "Amritsar, India",
        reviewDes: "The Golden Temple is not only a religious site but also a symbol of peace and brotherhood. The langar (community kitchen) serves free meals to thousands of visitors every day.",
        reviewPhoto: placeholder,
        rating: 3,
        user: { username: "culturefan" }
      }
    ];
  };

  // Transform review data to match ReviewBlock props structure
  const mapReviewToProps = (review) => {
    return {
      id: review._id,
      image: review.reviewPhoto || placeholder, // Use mumbai as fallback image
      location: review.locationVisited,
      title: review.title || "Untitled Review",
      description: review.reviewDes || "No description provided.",
      rating: review.rating || 4, // Default rating if not available
      name: review.user?.name || "Anonymous User"
    };
  };

  return (
    <div className="review-container grid">
      {loading ? (
        // Display skeletons while loading
        Array(5).fill().map((_, index) => (
          <ReviewSkeleton key={index} />
        ))
      ) : reviews.length === 0 ? (
        // Display message if no reviews
        <div className="col-span-full text-center py-12 text-gray-500">
          <h3 className="text-xl font-semibold mb-2">No Reviews Found</h3>
          <p>Be the first to share your travel experience!</p>
        </div>
      ) : (
        // Display actual reviews
        reviews.map((review) => (
          <ReviewBlock key={review._id} {...mapReviewToProps(review)} />
        ))
      )}
    </div>
  );
};

export default ReviewContainer;