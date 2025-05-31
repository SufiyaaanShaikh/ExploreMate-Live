import React from "react";
import penIcon from "../../images/pen.svg";
import { MdCancel } from "react-icons/md";

const TopPlaces = ({ writeReview, setWriteReview }) => (
  <div className="title flex items-center">
    <div className="grid">
      <h2 className="fw-700 sec-head">
        {writeReview
          ? "Let Others Discover Your Experience"
          : "Top places with trips"}
      </h2>
      <p className="para-f para-c para-f">
        Travelers want to see more trips of these places.
      </p>
    </div>
    <button
      onClick={() => setWriteReview(!writeReview)}
      className="write flex justify-content items-center group"
    >
      {writeReview ? <MdCancel className="group-hover:invert h-4"/> : <img src={penIcon} alt="pen" />}

      <p className="para-c para-f">
        {writeReview ? "Cancel" : "Write about trip"}
      </p>
    </button>
  </div>
);

export default TopPlaces;
