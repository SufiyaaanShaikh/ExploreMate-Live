import React from "react";
import { Link } from "react-router-dom";

const ReviewBlock = ({ id, image, location, title, description, rating = 4, name }) => (
  <div className="review-block grid">
    <Link to={`/single-review/${id}`} className="img-block h-100">
      <img src={image} alt={location} className="w-100 h-100" />
    </Link>
    <div className="content grid">
      <p className="para-c para-f">{location}</p>
      <h2 className="sec-title fw-500">{title}</h2>
      <p className="para-c para-f">{description}</p>
      {name && <p className="text-sm text-gray-500 mt-2">Posted by: {name}</p>}
      <div className="radio-wrapper-17">
        {[5, 4, 3, 2, 1].map((star) => (
          <React.Fragment key={star}>
            <input 
              id={`rating-17-${id}-${star}`} 
              type="radio" 
              name={`radio-examples-${id}`} 
              defaultChecked={star === rating}
              disabled 
            />
            <label 
              className={`rating-${star}`} 
              htmlFor={`rating-17-${id}-${star}`}
            ></label>
          </React.Fragment>
        ))}
      </div>
    </div>
  </div>
);

export default ReviewBlock;