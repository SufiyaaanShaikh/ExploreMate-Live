import React from "react";
import SearchIcon from "../../images/search-black.svg" 

const ReviewHeading = () => (
  <section id="review-head">
    <div className="sec items-center flex">
      <h1 className="fw-700 page-head">
        Share your Travel Experience in form of a story
      </h1>
      {/* <form action="" className="grid">
        <input
          type="text"
          placeholder="What would you like to review?"
          className="h-100 w-100 para-c para-f"
        />
        <button>
          <img src={SearchIcon} alt="search" />
        </button>
      </form> */}
    </div>
  </section>
);

export default ReviewHeading;
