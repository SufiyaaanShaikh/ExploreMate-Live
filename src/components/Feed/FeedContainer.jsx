import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import FeedCards from "./FeedCards";
import { motion } from "framer-motion";
import SearchInputBox from "./SearchInputBox";
import api from "../../config/axiosConfig";
import toast from "react-hot-toast";
import AuthContext from "../../context/AuthContext"; 

function FeedContainer() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialQuery = queryParams.get("query") || "";
  const navigate = useNavigate();
  const { currentUser, handleFollow } = useContext(AuthContext); 

  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  const fetchData = async (query = "") => {
    try {
      setLoading(true);
      const usersResponse = await api.get("/user", { params: { search: query } });
      setUsers(usersResponse.data.data || []);
      navigate(`/feed?query=${query}`, { replace: true });
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error(error.response?.data?.message || "Failed to fetch users");
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchData(searchQuery.trim());
    } else {
      navigate("/login");
      toast.error("Please login to view feed");
    }
  }, [searchQuery]);

  return (
    <motion.section
      id="main-feed"
      className="main-feed position"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="feed-sec sec pad flex">
        <div className="title">
          <h2 className="text-center fw-500 feedHeading mb-4">Travel Feed</h2>
          <SearchInputBox handleSearch={(e) => setSearchQuery(e.target.value)} searchQuery={searchQuery} />
        </div>

        <motion.div
          id="feedContainer"
          className="container flex flex-wrap justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {loading ? (
            <p className="text-center w-full">Loading users...</p>
          ) : users.length > 0 ? (
            <FeedCards filteredDestinations={users} handleFollow={handleFollow} currentUser={currentUser} />
          ) : (
       
            <p className="notFound f-16 text-center fw-500 mx-auto">
            {searchQuery ? `No Users Found for "${searchQuery}"` : "No Users Available"}
          </p>
          )}
        </motion.div>
      </div>
    </motion.section>
  );
}

export default FeedContainer;
