import React, { useEffect, useState } from "react";
import ProfileHeader from "../components/Profile/ProfileHeader";
import TabsContainer from "../components/Profile/TabsContainer";
import Footer from "../components/Footer";
import Header from "../components/Header";
import api from "../config/axiosConfig";
import userIcon from "../images/user.webp";
import { motion } from "framer-motion";

function Profile({trips, setTrips}) {
  const [profileImage, setProfileImage] = useState(userIcon);
  const [currentUser, setCurrentUser] = useState(null);
const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const { data } = await api.get("/user/me");
        setLoading(true);
        setCurrentUser(data);
        if (data.profilePhoto) {
          setProfileImage(data.profilePhoto);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentUser();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <motion.section 
        id="profile-main" 
        className="position pt-44"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <ProfileHeader  trips={trips} currentUser={currentUser} profileImage={profileImage}/>
          <div className="profile-block mb-[26rem]">
            <TabsContainer setTrips={setTrips} trips={trips} />
          </div>
        </div>
      </motion.section>
      <Footer />
    </>
  );
}

export default Profile;