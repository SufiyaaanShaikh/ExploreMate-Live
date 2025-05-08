import React from "react";

function Tabs({ tabs, activeTab, setActiveTab }) {
  return (
    <div className="tab-wrapper">
      <ul className="tabs">
        {tabs.map((tab) => (
          <li
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`tab-link ${activeTab === tab.id ? "active" : ""}`}
          >
            {tab.label}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Tabs;
