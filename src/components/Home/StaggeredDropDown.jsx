import { FiEdit, FiTrash, FiShare, FiUser, FiLogIn } from "react-icons/fi";
import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import profileIcon from "../../images/profil.svg";
import toast from "react-hot-toast";
import AuthContext from "../../context/AuthContext";
import Option from "../Home/Option";
import SpringModal from "../Home/SpringModal";
import api from "../../config/axiosConfig";

// Main Dropdown Component
const StaggeredDropDown = () => {
  const { handleLogout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/user/me");
        setCurrentUser(res.data);
      } catch (error) {
        console.error("Error fetching user:", error);
        setCurrentUser(null);
      }
    };
    fetchUser();
  }, []);

  return (
    <div className="flex items-center justify-center relative">
      {/* Dropdown Trigger */}
      <motion.div
        animate={dropdownOpen ? "open" : "closed"}
        className="relative"
      >
        <button
          onClick={() => setDropdownOpen((prev) => !prev)}
          className="flex items-center rounded-md text-indigo-50 transition-colors"
        >
          <img src={profileIcon} className="h-[20px]" alt="profile-icon" />
        </button>

        {/* Dropdown Menu */}
        <motion.ul
          initial="closed"
          animate={dropdownOpen ? "open" : "closed"}
          variants={dropdownVariants}
          style={{ originY: "top", translateX: "-50%" }}
          className="flex flex-col gap-2 p-2 rounded-lg bg-white shadow-xl absolute top-[120%] left-[50%] w-32 overflow-hidden"
        >
          {currentUser ? (
            <>
              <Option
                setDropdownOpen={setDropdownOpen}
                Icon={FiUser}
                text="Profile"
                path="/profile"
                bgHover="hover:bg-[#dee7ff]"
                textHover="hover:text-[#003dde]"
              />
              <Option
                setDropdownOpen={setDropdownOpen}
                Icon={FiEdit}
                text="Edit"
                path="/edit-profile"
                bgHover="hover:bg-[#dee7ff]"
                textHover="hover:text-[#003dde]"
              />
              <Option
                setDropdownOpen={setDropdownOpen}
                Icon={FiShare}
                text="Share"
                path="/share"
                bgHover="hover:bg-[#dee7ff]"
                textHover="hover:text-[#003dde]"
              />
              <Option
                setDropdownOpen={setDropdownOpen}
                Icon={FiTrash}
                bgHover="hover:bg-[#ffdede]"
                textHover="hover:text-[#de0000]"
                text="Logout"
                onClick={() => {
                  setIsOpen(true);
                  setDropdownOpen(false);
                }}
              />
            </>
          ) : (
            <>
              <Option
                setDropdownOpen={setDropdownOpen}
                Icon={FiLogIn}
                text="SignUp"
                path="/signup"
                bgHover="hover:bg-[#dee7ff]"
                textHover="hover:text-[#003dde]"
              />
              <Option
                setDropdownOpen={setDropdownOpen}
                Icon={FiUser}
                text="Login"
                path="/login"
                bgHover="hover:bg-[#dee7ff]"
                textHover="hover:text-[#003dde]"
              />
            </>
          )}
        </motion.ul>
      </motion.div>

      {/* Logout Confirmation Modal */}
      <SpringModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onConfirm={() => {
          handleLogout();
          setIsOpen(false);
          setCurrentUser(null)
          navigate("/");
        }}
      />
    </div>
  );
};

export default StaggeredDropDown;
// Animation Variants
const dropdownVariants = {
  open: {
    scaleY: 1,
    opacity: 1,
    transition: { when: "beforeChildren", staggerChildren: 0.1 },
  },
  closed: {
    scaleY: 0,
    opacity: 0,
    transition: { when: "afterChildren", staggerChildren: 0.1 },
  },
};
