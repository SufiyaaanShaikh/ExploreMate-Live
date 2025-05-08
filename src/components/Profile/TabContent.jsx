import React from "react";
import { AnimatePresence, motion } from "framer-motion";

function TabContent({ activeTab, tabContent }) {
  return (
    <div className="content-wrapper min-h-96 sec">
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.2 }}
        >
          {tabContent[activeTab]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default TabContent;
