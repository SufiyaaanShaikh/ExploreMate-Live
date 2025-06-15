import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../images/Explore.svg";
import StaggeredDropDown from "./Home/StaggeredDropDown";

function Header() {
  const [navOpen, setNavOpen] = useState(false);
  const location = useLocation();

  const isActive = (path) => location.pathname === path ? "bg-[#8DD3BB]  rounded" : "";


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
            <nav className={`flex ${navOpen ? "nav-show" : ""}`}>
              <Link
                to={"/"}
               className={`fw-500 px-2 py-px text-[#112211] f-16 ${isActive("/")}`}
              >
                Home
              </Link>
              <Link to={"/feed"} className={`fw-500 px-2 py-px text-[#112211] f-16 ${isActive("/feed")}`}>
                Users
              </Link>
              <Link to={"/review"} className={`fw-500 px-2 py-px text-[#112211] f-16 ${isActive("/review")}`}>
                Trip
              </Link>
            </nav>
            <label htmlFor="profile-menu" className="profile-menu">
              {/* <!-- profile-icon  --> */}
              <div className="" id="user">
                <StaggeredDropDown />
              </div>
            </label>
            <div>
              <label className="burger" htmlFor="burger">
                <input
                  type="checkbox"
                  id="burger"
                  onClick={() => handleBurgerClick()}
                />
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
