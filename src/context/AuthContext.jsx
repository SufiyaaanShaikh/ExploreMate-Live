import React, { createContext, useState, useEffect, useCallback } from "react";
import api from "../config/axiosConfig";
import toast from "react-hot-toast";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem("token"));
  // Store profile data for active user profiles to avoid refetching
  const [profileCache, setProfileCache] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      if (!token) {
        setIsLoading(false);
        return;
      }
      try {
        const res = await api.get("/user/me");
        setCurrentUser(res.data);
      } catch (error) {
        console.error("Error fetching user:", error);
        setCurrentUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, [token]);

  const handleLogin = (token) => {
    localStorage.setItem("token", token);
    setToken(token); // This will trigger the useEffect to fetch user data
  };

  // Fetch a user profile and cache it
  const fetchUserProfile = useCallback(async (userId) => {
    if (!token) return null;
    
    try {
      const response = await api.get(`/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      
      // Update the cache
      setProfileCache(prev => ({
        ...prev,
        [userId]: response.data
      }));
      
      return response.data;
    } catch (error) {
      console.error("Error fetching user profile:", error);
      return null;
    }
  }, [token]);

  const handleFollow = async (userId) => {
    if (!token || !currentUser) {
      toast.error("Please login to follow users");
      return false;
    }
    try {
      // Call the API to follow/unfollow
      await api.put(`/user/follow/${userId}`);
      
      // Update currentUser with new follow status (important for isFollowing check)
      const updatedUser = await api.get("/user/me");
      setCurrentUser(updatedUser.data);
      
      // Update the profile in cache if it exists
      if (profileCache[userId]) {
        await fetchUserProfile(userId);
      }
      
      toast.success("Follow status updated successfully");
      return true;
    } catch (error) {
      console.error("Follow/unfollow error:", error);
      toast.error(
        error.response?.data?.message || "Failed to update follow status"
      );
      return false;
    }
  };

  const handleLogout = async () => {
    try {
      await api.post("/auth/logout"); // Send logout request
      setCurrentUser(null); // Clear state
      localStorage.removeItem("token"); // Remove stored token
      setToken(null); // Clear token state
      setProfileCache({}); // Clear the profile cache
      toast.success("Successfully logged out!");
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed. Please try again.");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        handleFollow,
        handleLogout,
        handleLogin,
        isLoading,
        fetchUserProfile,
        profileCache,
        setCurrentUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;