import React, { memo } from "react";
import { Link } from "react-router-dom";
import imgSrcUser from "../../images/user.png";
import cityIcon from "../../images/destiniaion.svg";
import groupIcon from "../../images/group.svg";
import { motion } from "framer-motion";

// Memoized component to prevent unnecessary re-renders
const FeedCards = memo(function FeedCards({
  filteredDestinations = [],
  handleFollow,
  followLoading,
  currentUser,
}) {
  // Helper function to check if user is already followed
  const isUserFollowed = (userId) => {
    if (!currentUser?.following || !Array.isArray(currentUser.following)) {
      return false;
    }

    return currentUser.following.some((followingUser) => {
      // Handle both populated objects and simple IDs
      const followingId =
        typeof followingUser === "object" ? followingUser._id : followingUser;

      return followingId === userId;
    });
  };

  // If no users to display, return null
  if (!filteredDestinations.length) {
    return null;
  }
  return (
    <>
      {filteredDestinations.map((user, index) => {
        const isFollowing = isUserFollowed(user._id);

        return (
          <React.Fragment key={user._id}>
            {/* {followLoading ? ( */}
            {/* <LoadingSpinner /> */}
            {/* ) : ( */}
            <motion.div
              className="card grid"
              key={user._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <div className="head-block flex items-center">
                <div className="img-block">
                  <img
                    src={user.profilePhoto || imgSrcUser}
                    alt={`${user.name}'s profile`}
                    className="w-100 h-100"
                    loading="lazy" // Add lazy loading for images
                  />
                </div>
                {/* {true && ( */}
                <button
                  type="button"
                  disabled={followLoading}
                  className={`followBtn ${
                    isFollowing
                      ? "bg-transparent hover:text-zinc-700"
                      : "bg-black text-white hover:bg-zinc-800"
                  }`}
                  onClick={() => handleFollow(user._id)}
                >
                  {isFollowing ? "Unfollow" : "Follow"}
                </button>
                {/* )} */}
              </div>
              <div className="content">
                <div className="title">
                  <h3 className="fw-500">{user.name}</h3>
                </div>
                <div className="detail flex items-center">
                  <img src={cityIcon} alt="location" />
                  <p className="para-c para-f">
                    {user.address || "No address"}
                  </p>
                </div>
                <div className="detail flex items-center">
                  <img src={groupIcon} alt="bio" />
                  <p className="para-c para-f">
                    {user.bio
                      ? user.bio.length > 100
                        ? `${user.bio.substring(0, 97)}...`
                        : user.bio
                      : "No bio"}
                  </p>
                </div>
                <div className="view">
                  <Link
                    to={`${
                      user._id === currentUser?._id
                        ? `/profile`
                        : `/user/${user._id}`
                    }`}
                    className="viewProfileBtn flex items-center justify-content"
                  >
                    View Profile
                  </Link>
                </div>
              </div>
            </motion.div>
            {/* )} */}
          </React.Fragment>
        );
      })}
    </>
  );
});

export default FeedCards;
