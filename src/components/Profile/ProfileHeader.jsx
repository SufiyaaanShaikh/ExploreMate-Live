import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import editIcon from "../../images/edit-icon.svg";
import shareIcon from "../../images/share.svg";

function ProfileHeader({ currentUser,profileImage, trips }) {


  return (
    <div className="profile-header profile-block bg-white">
      <div className="container flex-col flex items-center">
        <div className="profile-pic">
          <img src={profileImage} alt="user-image" className="w-100 h-100" />
          <Link to="/edit-profile" className="edit-icon grid">
            <img src={editIcon} alt="edit-icon" title="Edit" />
          </Link>
        </div>
        <h2 className="sec-head username">
        {currentUser?.name || "Username"}
        </h2>
        <h3 className="f-16 para-c city">{currentUser?.address || "Address"}</h3>
        <p className="profil-para para-f para-c">
        {currentUser?.bio || "No bio available"}
        </p>
        <div className="profile-details">
          <div className="block">
            <p className="numbers">{trips?.length || 0}</p>
            <p className="des f-16">Post</p>
          </div>
          <div className="block">
            <p className="numbers">{currentUser?.followers?.length || 0}</p>
            <p className="des f-16">Followers</p>
          </div>
          <div className="block">
            <p className="numbers">{currentUser?.following?.length || 0}</p>
            <p className="des f-16">Following</p>
          </div>
        </div>
        <div className="btn-block flex">
          <button id="shareBtn" className="flex items-center fw-500">
            <img src={shareIcon} alt="share icon" className="invert" />
            <span>Share</span>
          </button>
          <Link
            to="/edit-profile"
            id="editBtn"
            className="flex items-center fw-500"
          >
            <img src={editIcon} alt="edit-icon" className="invert" />
            <span>Edit</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProfileHeader;
