// TabsContainer.jsx
import React, { useState } from "react";
import Tabs from "./Tabs";
import TabContent from "./TabContent";
import TripsTab from "./TabContents/TripsTab";
import FollowersTab from "./TabContents/FollowersTab";
import FollowingTab from "./TabContents/FollowingTab";
import ReviewsTab from "./TabContents/ReviewsTab";
import { AnimatePresence, motion } from "framer-motion";

function TabsContainer({setTrips, trips}) {
  const [activeTab, setActiveTab] = useState("tab1");

  const tabs = [
    { id: "tab1", label: "Upcoming Trip" },
    { id: "tab2", label: "Followers" },
    { id: "tab3", label: "Following" },
    { id: "tab4", label: "Trip" },
  ];

  const tabContent = {
    tab1: <TripsTab setTrips={setTrips} trips={trips}/>,
    tab2: <FollowersTab />,
    tab3: <FollowingTab />,
    tab4: <ReviewsTab />,
  };

  return (
    <div className="tab-container pt-5 overflow-hidden">
      <Tabs
        tabs={tabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <TabContent activeTab={activeTab} tabContent={tabContent} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default TabsContainer;