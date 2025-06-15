import React from "react";
import { Link } from "react-router-dom";
import logo from "../../images/Explore.svg";

const FormHeading = ({ heading, subHeading, user }) => (
  <>
    <Link to="/" className="logo">
      <h2 className="logo-text">
        <span className="highlight">E</span>
        xplore
        <span className="highlight">M</span>
        ates
      </h2>
    </Link>
    <h1 className="">
      {heading}
      {user ? user?.name || user : ""}
    </h1>
    <h3 className="para-f">{subHeading}</h3>
  </>
);

export default FormHeading;
