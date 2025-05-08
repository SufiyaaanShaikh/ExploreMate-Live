import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchInputBox from "../Feed/SearchInputBox";
import SliderContainer from "./SliderContainer";

function Banner() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/feed?query=${searchQuery.trim()}`); // Redirect with query
    }
  };

  return (
    <section id="main" className="vh-100 bg-white position">
      <div className="sec main-container vh-100">
        <div className="left flex">
          <h1 className="text-zinc-800 text-5xl/[55px] font-semibold">
            Journey with Like-Minded Explorers.
          </h1>
          <p className="text-gray-500 text-sm w-3/4 mt-6">
            Discover unique destinations, connect with fellow travelers, and
            create unforgettable memories with ExploreMates.
          </p>
          <SearchInputBox
            handleSearch={handleSearch}
            searchQuery={searchQuery}
            onSubmit={handleSubmit} // Trigger navigation
          />
        </div>
        <div className="right grid place-items-center">
          <SliderContainer />
        </div>
      </div>
    </section>
  );
}

export default Banner;
