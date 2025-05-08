import React from "react";
import searchBlackIcon from "../../images/search-black.svg";
import { useLocation } from "react-router-dom";

function SearchInputBox({ handleSearch, searchQuery, onSubmit }) {
  const location = useLocation();
  const isHomePage = location.pathname === "/";
  return (
    <form
      onSubmit={onSubmit} // Handle form submission
      className={`flex items-center justify-content text-center bg-gray-100 ${
        isHomePage ? "main-search" : "feedSearchBox"
      }`}
    >
      <img src={searchBlackIcon} alt="search" />
      <input
        onChange={handleSearch} // Triggered on input change
        value={searchQuery} // Controlled input
        className="para-f w-100 bg-gray-100 text-zinc-800 placeholder:text-zinc-800"
        type="text"
        placeholder="Search Partner or Location"
        autoComplete="off"
      />
    
    </form>
  );
}

export default SearchInputBox;
