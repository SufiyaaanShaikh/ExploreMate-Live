import { useState, useEffect, useContext, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import LoadingSpinner from "../../components/LoadingSpinner"; // Assume we have this component;
import toast from "react-hot-toast";
import userIcon from "../../images/user.webp";
import Header from "../Header";
import Footer from "../Footer";
import AuthContext from "../../context/AuthContext";

function UserProfileHeader({ trips }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  // const [followLoading, setFollowLoading] = useState(false);

  const {
    currentUser,
    handleFollow,
    followLoading,
    profileCache,
    fetchUserProfile,
  } = useContext(AuthContext);

  // Authentication check and data fetching
  useEffect(() => {
    // if (!token) {
    //   toast.error("Please login to view profiles");
    //   const timer = setTimeout(() => navigate("/login"), 1500);
    //   return () => clearTimeout(timer);
    // }

    const fetchProfileData = async () => {
      try {
        setLoading(true);

        // Check if profile is in cache
        if (profileCache[id]) {
          setProfile(profileCache[id]);
          setLoading(false);
          return;
        }

        // If not in cache, fetch it
        const profileData = await fetchUserProfile(id);
        if (profileData) {
          setProfile(profileData);
        } else {
          // navigate("/feed"); // Redirect to feed if user not found
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
        toast.error(error.response?.data?.message || "Failed to load profile");
        if (error.response?.status === 404) {
          navigate("/feed"); // Redirect to feed if user not found
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [id, navigate, fetchUserProfile, profileCache]);

  // Check if current user is following profile user - memoized to prevent recalculation
  const isFollowing = useMemo(() => {
    if (!currentUser?.following || !profile?._id) return false;

    return currentUser.following.some((followedUser) => {
      const followedId =
        typeof followedUser === "object" ? followedUser._id : followedUser;

      return followedId === profile._id;
    });
  }, [currentUser?.following, profile?._id]);

  // Handle follow/unfollow with optimistic UI update
  // const handleProfileFollow = async () => {
  //   if (followLoading || !currentUser) return;

  //   try {
  //     setFollowLoading(true);

  //     // Optimistically update UI before API call completes
  //     const wasFollowing = isFollowing;

  //     setProfile((prevProfile) => {
  //       if (!prevProfile) return prevProfile;

  //       const newFollowersCount = wasFollowing
  //         ? (prevProfile.followers?.length || 1) - 1
  //         : (prevProfile.followers?.length || 0) + 1;

  //       return {
  //         ...prevProfile,
  //         followers: Array(newFollowersCount).fill(null), // Just for count display
  //       };
  //     });

  //     // Make the actual API call to update follow status
  //     const success = await handleFollow(id);

  //     // If the call failed, revert the optimistic update
  //     if (!success) {
  //       setProfile((prevProfile) => {
  //         if (!prevProfile) return prevProfile;

  //         const originalFollowersCount = wasFollowing
  //           ? (prevProfile.followers?.length || 0) + 1
  //           : (prevProfile.followers?.length || 1) - 1;

  //         return {
  //           ...prevProfile,
  //           followers: Array(originalFollowersCount).fill(null),
  //         };
  //       });
  //     } else {
  //       // On success, we need to refresh the profile data to get accurate counts
  //       const updatedProfile = await fetchUserProfile(id);
  //       if (updatedProfile) {
  //         setProfile(updatedProfile);
  //       }
  //     }
  //   } catch (error) {
  //     console.error("Follow/unfollow error:", error);
  //   } finally {
  //     setFollowLoading(false);
  //   }
  // };

  // Loading state
  if (loading) {
    return (
      <>
        <Header />
        <div className="flex justify-center items-center min-h-screen">
          <LoadingSpinner />
        </div>
        <Footer />
      </>
    );
  }

  // Not found state
  if (!profile) {
    return (
      <>
        {/* <Header /> */}
        <div className="flex z-40 bg-white justify-center items-center min-h-screen">
          <p>User not found</p>
        </div>
        {/* <Footer /> */}
      </>
    );
  }
  return (
    <>
      <div className="profile-block">
        <div className="container flex items-center">
          <div className="profile-pic">
            <img
              src={profile.profilePhoto || userIcon}
              alt={`${profile.name}'s Profile`}
              className="w-100 h-100"
            />
          </div>
          <h2 id="profileUserName" className="sec-head username">
            {profile.name}
          </h2>
          <h3 id="profileCity" className="f-16 para-c city">
            {profile.address || "No location specified"}
          </h3>
          <p className="profil-para para-f para-c">
            {profile.bio || "No bio available"}
          </p>
          <div className="profile-details">
            <div className="block">
              <p className="numbers">{trips?.length || 0}</p>
              <p className="des f-16">Posts</p>
            </div>
            <div className="block">
              <p className="numbers">{profile?.followers?.length || 0}</p>
              <p className="des f-16">Followers</p>
            </div>
            <div className="block">
              <p className="numbers">{profile?.following?.length || 0}</p>
              <p className="des f-16">Following</p>
            </div>
          </div>
          {/* {currentUser && currentUser._id !== profile._id && ( */}
          <div className="btn-block flex">
            <button
              type="button"
              onClick={() => handleFollow(profile._id)}
              disabled={followLoading}
              id="followBtn"
              className={`followBtn ${
                isFollowing
                  ? "bg-transparent hover:text-zinc-700"
                  : "bg-black text-white hover:bg-zinc-800"
              }`}
            >
              {followLoading
                ? "Processing..."
                : isFollowing
                ? "Unfollow"
                : "Follow"}
            </button>
            {/* <button id="msgBtn" className="msgBtn">
              Message
            </button> */}
          </div>
          {/* )} */}
        </div>
      </div>
    </>
  );
}

export default UserProfileHeader;
