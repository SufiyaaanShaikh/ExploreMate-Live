import React from "react";

function SectionHeading({ secHead, secSubHead }) {
  return (
    <>
      <div className="title">
        <h2 className="fw-700 sec-head text-center">{secHead}</h2>
        <p className="head-para para-c para-f text-center">{secSubHead}</p>
      </div>
    </>
  );
}

export default SectionHeading;
