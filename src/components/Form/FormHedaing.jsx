import React from "react";
import { Link } from "react-router-dom";
import logo from "../../images/Explore.svg";

const FormHedaing = ({ heading, subHeading, user }) => (
  <>
    <Link to="/" className="logo">
      <img src={logo} alt="logo" className="w-100 h-100" />
    </Link>
    <h1 className="fw-700">
      {heading}
      {user ? user?.name || user : ""}
    </h1>
    <h3 className="f-16">{subHeading}</h3>
  </>
);

export default FormHedaing;
