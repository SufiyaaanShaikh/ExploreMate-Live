import React, { useState, useEffect, useContext } from "react";
import { useLocation, Link } from "react-router-dom";
import SectionHeading from "./SectionHeading";
import FeedCards from "../Feed/FeedCards";
import api from "../../config/axiosConfig";
import AuthContext from "../../context/AuthContext";

const MainFeed = () => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  const [users, setUsers] = useState([]);
  const { currentUser, handleFollow } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const usersResponse = await api.get("/user");
        setUsers(usersResponse.data.data || []); // Ensure an array
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchData();
  }, []);

  // Show only 4 users on the homepage
  const displayedUsers = isHomePage ? users.slice(0, 6) : users;
  return (
    <>
      {displayedUsers.length > 0 ? (
        <section id="main-feed" className="vh-70 position">
          <div className="sec vh-70 pad flex justify-content">
            <SectionHeading
              secHead="Travel Feed"
              secSubHead="Find a travel buddy"
            />
            <div
              id="feedContainer"
              className="container flex justify-center flex-wrap main-feedContainer"
            >
              {/* <div className="container flex justify-center items-center">
                <p>No Users Available</p>
              </div> */}

              <FeedCards
                filteredDestinations={displayedUsers}
                handleFollow={handleFollow}
                currentUser={currentUser}
              />
            </div>
            <div className="view-all text-center">
              <Link to="/feed" className="btn fw-500 para-f">
                View All
              </Link>
            </div>
          </div>
        </section>
      ) : (
        ""
      )}
    </>
  );
};

export default MainFeed;
