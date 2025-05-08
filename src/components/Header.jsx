import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Example from "../components/Home/Example";
import profileIcon from "../images/profil.svg";
import logo from "../images/download.png";
import StaggeredDropDown from "./Home/StaggeredDropDown";

function Header() {
  const [navOpen, setNavOpen] = useState(false);

  const handleBurgerClick = () => {
    setNavOpen(!navOpen);
  };
  return (
    <>
      <header className="w-100">
        <div className="sec flex items-center">
          <div className="logo">
            <Link to="/">
              <img src={logo} alt="logo" />
            </Link>
          </div>
          <div className="right flex items-center">
            <nav
              className={`flex ${ navOpen ? "nav-show" : ""}`}
                            // initial="closed"
              // animate={dropdownOpen ? "open" : "closed"}
              // variants={dropdownVariants}
              // style={{ originY: "top", translateX: "-50%" }}
            >
              <Link to={"/"} className="fw-500 f-16">
                Home
              </Link>
              <Link to={"/feed"} className="fw-500 f-16">
                Users
              </Link>
              <Link to={"/review"} className="fw-500 f-16">
                Review
              </Link>
            </nav>
            <label htmlFor="profile-menu" className="profile-menu">
              {/* <!-- profile-icon  --> */}
              <div className="" id="user">
                <StaggeredDropDown />
              </div>
            </label>
            <div
              // animate={dropdownOpen ? "open" : "closed"}
              // className="relative"
            >
              <label className="burger" htmlFor="burger" >
                <input type="checkbox" id="burger" onClick={()=> handleBurgerClick()} />
                <span></span>
                <span></span>
                <span></span>
              </label>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
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
