import { useState } from "react";
import { FaUser, FaStar, FaSuitcase, FaBars } from "react-icons/fa";
import { FaCirclePlus, FaMountainSun } from "react-icons/fa6";

const Sidebar = ({ activeTab, setActiveTab }) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div
      className={`bg-[#003dde] text-white h-full p-3 md:p-4 transition-all duration-300 ${
        isOpen ? "w-48 md:w-64" : "w-16"
      }`}
    >
      {/* Sidebar Toggle */}
      <button 
        onClick={() => setIsOpen(!isOpen)} 
        className="mb-4 p-2 text-xl w-full flex justify-center md:justify-start"
        aria-label="Toggle sidebar"
      >
        <FaBars />
      </button>

      {/* Navigation Tabs */}
      <nav className="flex flex-col gap-3">
        <button
          onClick={() => setActiveTab("Users")}
          className={`flex items-center gap-2 p-2 rounded ${
            activeTab === "Users" ? "bg-[#abc2ff] text-black" : ""
          } ${!isOpen ? "justify-center" : ""}`}
        >
          <FaUser /> {isOpen && <span className="truncate">Users</span>}
        </button>
        <button
          onClick={() => setActiveTab("Trips")}
          className={`flex items-center gap-2 p-2 rounded ${
            activeTab === "Trips" ? "bg-[#abc2ff] text-black" : ""
          } ${!isOpen ? "justify-center" : ""}`}
        >
          <FaSuitcase /> {isOpen && <span className="truncate">Trips</span>}
        </button>
        <button
          onClick={() => setActiveTab("Reviews")}
          className={`flex items-center gap-2 p-2 rounded ${
            activeTab === "Reviews" ? "bg-[#abc2ff] text-black" : ""
          } ${!isOpen ? "justify-center" : ""}`}
        >
          <FaStar /> {isOpen && <span className="truncate">Reviews</span>}
        </button>
        <button
          onClick={() => setActiveTab("AddWiki")}
          className={`flex items-center gap-2 p-2 rounded ${
            activeTab === "AddWiki" ? "bg-[#abc2ff] text-black" : ""
          } ${!isOpen ? "justify-center" : ""}`}
        >
         <FaCirclePlus /> {isOpen && <span className="truncate">AddWiki</span>}
        </button>
        <button
          onClick={() => setActiveTab("DisplayWiki")}
          className={`flex items-center gap-2 p-2 rounded ${
            activeTab === "DisplayWiki" ? "bg-[#abc2ff] text-black" : ""
          } ${!isOpen ? "justify-center" : ""}`}
        >
         <FaMountainSun /> {isOpen && <span className="truncate">DisplayWiki</span>}
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;