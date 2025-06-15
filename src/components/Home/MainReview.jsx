import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SectionHeading from "./SectionHeading";
import MainReviewCards from "./MainReviewCards";
import api from "../../config/axiosConfig";

function MainReview() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch all reviews for display on the home page
    fetchAllReviews();
  }, []);

  const fetchAllReviews = async () => {
    try {
      const response = await api.get("/review/all");
      if (response.data && response.data.data) {
        // Limit to 6 reviews for homepage display
        setReviews(response.data.data.slice(0, 6));
      } else {
        console.error("Unexpected response format:", response.data);
        setReviews([]);
      }
    } catch (error) {
      console.error("Error fetching reviews:", error);
      setReviews([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <div className="container flex justify-center items-center">
          <p>Loading trips...</p>
        </div>
      ) : reviews.length > 0 ? (
        <section id="main-review" className="vh-70 position">
          <div className="sec vh-70 flex justify-content items-center pad">
            <SectionHeading
              secHead="Top places with trip"
              secSubHead="Travelers trip"
            />

            <div className="container flex justify-center flex-wrap">
              <MainReviewCards reviewData={reviews} />
            </div>

            <div className="view-all text-center flex">
              <Link to="/review" className="btn fw-500 para-f">
                View All
              </Link>
            </div>
          </div>
        </section>
      ) : (
        // <div className="container flex justify-center items-center">
        //   <p>No reviews available at the moment.</p>
        // </div> 
        " "
      )}
    </>
  );
}

export default MainReview;
