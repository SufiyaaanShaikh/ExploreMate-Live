import React, { useState, useEffect, useContext, useMemo } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Tabs from "../components/Profile/Tabs";
import TabContent from "../components/Profile/TabContent";
import UserProfileHeader from "../components/UserProfile/UserProfileHeader";
import { motion, AnimatePresence } from "framer-motion";
import TabsContainer from "../components/Profile/TabsContainer";

function UserProfile({trips, setTrips}) {

  return (
    <>
      <Header />
      <div className="bg-white relative overflow-hidden">
      <motion.section 
        id="profile-main" 
        className="position pt-44 "
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <UserProfileHeader  trips={trips}/>

          <div className="profile-block mb-[26rem]">
            <div className="tab-container overflow-hidden pt-5">
              <TabsContainer setTrips={setTrips} trips={trips}/>
            </div>
          </div>
        </div>
      </motion.section>
      </div>
      <Footer />
    </>
  );
}

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1 
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 100
      }
    }
  };

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

export default UserProfile;