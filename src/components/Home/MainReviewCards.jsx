import React from 'react';
import { Link } from "react-router-dom";

// Image import context
const images = require.context("../../images", false, /\.(png|jpe?g|svg|webp)$/);

function MainReviewCards({ reviewData }) {
  // Check if reviewData is available and is an array
  if (!reviewData || !Array.isArray(reviewData) || reviewData.length === 0) {
    return <div className="no-reviews">No reviews available</div>;
  }

  return (
    <>
      {reviewData.map((review) => {
        // Determine if this is frontend mock data or backend data by checking properties
        const isBackendData = review.hasOwnProperty('_id');
        
        // Extract the appropriate ID
        const reviewId = isBackendData ? review._id : review.id;
        
        // Set up the link - for backend data use the review ID
        const reviewLink = isBackendData ? `/single-review/${reviewId}` : review.link;
        
        // Set up the image source - use reviewPhoto if available, otherwise use mock data
        const imageSource = review.reviewPhoto 
          ? review.reviewPhoto 
          : (review.imgName ? images(`./${review.imgName}`) : images('./placeholder.webp'));
        
        // Set up the location - use locationVisited if available, otherwise use location from mock data
        const locationText = isBackendData ? review.locationVisited : review.location;
        
        // Set up the description - use reviewDes if available, otherwise use description from mock data
        const descriptionText = isBackendData ? review.reviewDes : review.description;
        
        return (
          <div className="card grid" key={reviewId}>
            <Link to={reviewLink}>
              <div className="img-block h-100">
                <img
                  src={imageSource}
                  alt={review.title || "Review image"}
                  className="h-100 w-100"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = images('./placeholder.jpg');
                  }}
                />
              </div>
            </Link>
            <div className="content">
              <div className="content-title flex">
                <h5>{review.title}</h5>
                <div className="rating flex items-center">
                  <p>{review.rating}</p>
                  <img src={images("./check-star.svg")} alt="star" />
                </div>
              </div>
              <p className="para-c para-f">{locationText}</p>
              <div className="para">
                {descriptionText && descriptionText.length > 150 
                  ? `${descriptionText.substring(0, 150)}...` 
                  : descriptionText}
              </div>
              <span>
                <Link to={reviewLink} className="read para-c">
                  read more...
                </Link>
              </span>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default MainReviewCards;