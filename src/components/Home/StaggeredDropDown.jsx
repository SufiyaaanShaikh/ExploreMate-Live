import { FiEdit, FiTrash, FiShare, FiUser, FiLogIn } from "react-icons/fi";
import { MdOutlineSupportAgent } from "react-icons/md";
import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import profileIcon from "../../images/profil.svg";
import toast from "react-hot-toast";
import AuthContext from "../../context/AuthContext";
import Option from "../Home/Option";
import SpringModal from "../Home/SpringModal";
import api from "../../config/axiosConfig";

// Main Dropdown Component
const StaggeredDropDown = () => {
  const { handleLogout, currentUser, setCurrentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  // const [currentUser, setCurrentUser] = useState(null);

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     try {
  //       const res = await api.get("/user/me");
  //       setCurrentUser(res.data);
  //       console.log("Current User:", res.data);
  //     } catch (error) {
  //       console.error("Error fetching user:", error);
  //       setCurrentUser(null);
  //     }
  //   };
  //   fetchUser();
  // }, []);

  return (
    <div className="flex items-center justify-center relative">
      {/* Dropdown Trigger */}
      <motion.div
        animate={dropdownOpen ? "open" : "closed"}
        className="relative"
      >
        {currentUser ? (
          <button
            onClick={() => setDropdownOpen((prev) => !prev)}
            className="flex items-center cursor-pointer transition-colors"
          >
            <img
              src={currentUser.profilePhoto || profileIcon}
              alt="profile"
              className="h-[30px] w-[30px] rounded-full object-cover"
            />
            <span className="text-zinc-900 font-medium text-sm ml-2">
              {currentUser.username || "User"}
            </span>
          </button>
        ) : (
          <>
            <Link
              to="/login"
              className="flex items-center cursor-pointer transition-colors border border-solid hover:border-zinc-600 rounded-md p-2"
              onClick={() => setDropdownOpen(false)}
            >
              <img
                src={profileIcon}
                alt="default-profile"
                className="h-[16px] w-[16px]"
              />
              <span className="text-zinc-900 font-medium text-sm fw-500 ml-2">
                Sign in
              </span>
            </Link>
          </>
        )}

        {/* Profile Icon Button */}
        {/* <button
          onClick={() => setDropdownOpen((prev) => !prev)}
          className="flex items-center rounded-md text-indigo-50 transition-colors"
        >
          <img src={profileIcon} className="h-[20px]" alt="profile-icon" />
        </button> */}

        {/* Dropdown Menu */}
        <motion.ul
          initial="closed"
          animate={dropdownOpen ? "open" : "closed"}
          variants={dropdownVariants}
          style={{ originY: "top", translateX: "-50%" }}
          className="flex flex-col gap-2 p-2 rounded-lg bg-white shadow-xl absolute top-[120%] left-[-30%] w-60 overflow-hidden"
        >
          <motion.li
            className="flex items-center gap-2 p-2 "
            variants={itemVariants}
          >
            <img
              src={currentUser?.profilePhoto || profileIcon}
              alt="profile"
              className="h-[50px] w-[50px] rounded-full object-cover"
            />
            <div className="flex flex-col justify-center">
              <Link to="/profile" className="text-lg hover:text-zinc-500 font-semibold text-zinc-900">
                {currentUser ? currentUser.username : "Guest User"}
              </Link>
              <p className="text-xs text-zinc-600">
                {currentUser ? currentUser.email : "Not logged in"}
              </p>
            </div>
          </motion.li>
          {/* {currentUser ? ( */}
          <>
            <motion.li variants={itemVariants}>
              <hr className="h-[0.5px] bg-[#112211] opacity-25 mx-2" />
            </motion.li>
            <Option
              setDropdownOpen={setDropdownOpen}
              Icon={FiUser}
              itemVariants={itemVariants}
              text="Profile"
              path="/profile"
              bgHover="hover:bg-[#dee7ff]"
              textHover="hover:text-[#003dde]"
            />
            <Option
              setDropdownOpen={setDropdownOpen}
              Icon={FiEdit}
              itemVariants={itemVariants}
              text="Edit"
              path="/edit-profile"
              bgHover="hover:bg-[#dee7ff]"
              textHover="hover:text-[#003dde]"
            />
            <Option
              setDropdownOpen={setDropdownOpen}
              Icon={FiShare}
              itemVariants={itemVariants}
              text="Share"
              path="/share"
              bgHover="hover:bg-[#dee7ff]"
              textHover="hover:text-[#003dde]"
            />
            <motion.li variants={itemVariants}>
              <hr className="h-[0.5px] bg-[#112211] opacity-25 mx-2" />
            </motion.li>
            <Option
              setDropdownOpen={setDropdownOpen}
              Icon={MdOutlineSupportAgent}
              itemVariants={itemVariants}
              text="Support"
              path="/share"
              bgHover="hover:bg-[#dee7ff]"
              textHover="hover:text-[#003dde]"
            />
            <Option
              setDropdownOpen={setDropdownOpen}
              Icon={FiTrash}
              itemVariants={itemVariants}
              bgHover="hover:bg-[#ffdede]"
              textHover="hover:text-[#de0000]"
              text="Logout"
              onClick={() => {
                setIsOpen(true);
                setDropdownOpen(false);
              }}
            />
          </>
          {/* ) : ( */}
          {/* <>
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
            </> */}
          {/* )} */}
        </motion.ul>
      </motion.div>

      {/* Logout Confirmation Modal */}
      <SpringModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onConfirm={() => {
          handleLogout();
          setIsOpen(false);
          setCurrentUser(null);
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

// Animation Variants
const itemVariants = {
  open: {
    opacity: 1,
    y: 0,
  },
  closed: {
    opacity: 0,
    y: -10,
  },
};
