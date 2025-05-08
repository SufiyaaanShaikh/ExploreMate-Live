import React, { useState } from "react";
import ReviewHeader from "../components/Review/ReviewHeading";
import TopPlaces from "../components/Review/TopPlaces";
import ReviewContainer from "../components/Review/ReviewContainer";
import Footer from "../components/Footer";
import WriteReview from "../components/Review/WriteReview";
import Header from "../components/Header";

function Review() {
  const [writeReview, setWriteReview] = useState(false);
  return (
    <>
      <Header />
      <ReviewHeader />
      <section id="review" className="position">
        <div className="sec">
          <TopPlaces
            writeReview={writeReview}
            setWriteReview={setWriteReview}
          />
          {writeReview ? (
            <WriteReview setWriteReview={setWriteReview} />
          ) : (
            <ReviewContainer />
          )}
        </div>
      </section>
      <Footer />
    </>
  );
}

export default Review;
