// FollowersTab.jsx
import React, { useEffect, useState, useContext, useCallback } from "react";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa6";
import api from "../../../config/axiosConfig";
import toast from "react-hot-toast";
import { Link, useLocation, useParams } from "react-router-dom";
import AuthContext from "../../../context/AuthContext";
import defaultProfilePic from "../../../images/user.webp";

function FollowersTab() {
  const { id } = useParams();
  const location = useLocation();
  const isProfilePage = location.pathname === "/profile";
  const token = localStorage.getItem("token");
  const [followers, setFollowers] = useState([]);
  const { currentUser, profileCache, fetchUserProfile } =
    useContext(AuthContext);

  // Use a function to fetch followers that can be called when needed
  const fetchFollowers = useCallback(async () => {
    try {
      let userData;
      if (isProfilePage) {
        // Use currentUser if we're on the profile page
        if (currentUser) {
          setFollowers(currentUser.followers || []);
          return;
        }
        const response = await api.get("/user/me");
        userData = response.data;
      } else {
        // For other users' profiles, check cache first
        if (profileCache[id]) {
          setFollowers(profileCache[id].followers || []);
          return;
        }
        // If not in cache, fetch from API
        userData = await fetchUserProfile(id);
      }

      if (userData && userData.followers) {
        setFollowers(userData.followers);
      }
    } catch (error) {
      toast.error("Failed to fetch user details");
      console.error("Error fetching user data:", error);
    }
  }, [id, isProfilePage, currentUser, profileCache, fetchUserProfile]);

  // Fetch followers when component mounts or when dependencies change
  useEffect(() => {
    fetchFollowers();
  }, [fetchFollowers, currentUser?.followers]);

  // Listen for updates to currentUser.following to know when follow status changes
  useEffect(() => {
    if (!isProfilePage && currentUser?.following) {
      // If the current profile id is in following, need to refresh
      const isFollowing = currentUser.following.some(
        (f) => (typeof f === "object" ? f._id : f) === id
      );

      // Refresh this user's followers when follow status changes
      if (isFollowing !== undefined) {
        fetchFollowers();
      }
    }
  }, [currentUser?.following, id, isProfilePage, fetchFollowers]);

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

  if (!followers || followers.length <= 0) {
    return <p className="text-center">No Followers yet</p>;
  }

  return (
    <motion.div
      className="tab-content grid place-items-center"
      initial="hidden"
      animate="visible"
      variants={fadeInVariants}
    >
      <h3 className="font-medium">Followers Count</h3>
      <div className="tab-block w-full mt-4">
        <motion.div
          className="followers-container flex flex-wrap justify-center"
          variants={containerVariants}
        >
          {followers.map((follower) => {
            const followerId = follower._id;
            const isCurrentUser = followerId === currentUser?._id;

            return (
              <motion.div
                key={followerId}
                className="follower-card border-gray-200 border-solid p-4 border rounded-lg grid gap-4 w-full"
                variants={itemVariants}
                whileHover={{
                  scale: 1.02,
                  boxShadow: "0px 3px 10px rgba(0,0,0,0.05)",
                }}
              >
                <div className="flw-heading items-center flex gap-2">
                  <div className="img-block h-7 w-7">
                    <img
                      src={follower.profilePhoto || defaultProfilePic}
                      className="h-full w-full object-cover rounded-full"
                      alt="user image"
                    />
                  </div>
                  <div className="flw-name flex-grow">
                    <h3 className="text-sm font-medium">{follower.name}</h3>
                    <p className="trip text-xs text-gray-500">4 trips</p>
                  </div>
                  <Link to={isCurrentUser ? "/profile" : `/user/${followerId}`}>
                    <motion.div
                      className="viewPf group cursor-pointer bg-black h-7 w-7 grid place-items-center rounded-full"
                      whileHover={{ rotate: 45 }}
                    >
                      <FaArrowRight className="invert ease-in-out duration-300 -rotate-45" />
                    </motion.div>
                  </Link>
                </div>

                <div className="flw flex justify-between">
                  <p className="text-xs text-gray-700">
                    {follower?.followers?.length ?? 0} Followers
                  </p>
                  <p className="text-xs text-gray-700">
                    {follower?.following?.length ?? 0} Following
                  </p>
                </div>

                <Link to={isCurrentUser ? "/profile" : `/user/${followerId}`}>
                  <motion.button
                    className="w-full border border-solid rounded-3xl text-sm font-medium p-2 bg-black text-white hover:bg-white hover:text-black ease-in-out duration-500"
                    whileTap={{ scale: 0.95 }}
                  >
                    View Profile
                  </motion.button>
                </Link>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </motion.div>
  );
}

export default FollowersTab;
