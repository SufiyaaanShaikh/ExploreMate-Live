import React, { useContext, useEffect, useState } from "react";
import AdminPanel from "./AdminPanel";
import Home from "./Home";
import api from "../config/axiosConfig";
import LoadingSpinner from "../components/LoadingSpinner";
import AuthContext from "../context/AuthContext";

function Private() {  
    const { currentUser } = useContext(AuthContext);
  // const [currentUser, setCurrentUser] = useState(null);
  // const [isLoading, setIsLoading] = useState(true);
  // useEffect(() => {
  //   const fetchUser = async () => {
  //     try {
  //       setIsLoading(true);
  //       const res = await api.get("/user/me");
  //       setCurrentUser(res.data);
  //     } catch (error) {
  //       console.error("Error fetching user:", error);
  //       setCurrentUser(null);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   };
  //   fetchUser();
  // }, []);

 

  return (
    <>
      {currentUser?.userType === "admin" ? (
        <div>
          <AdminPanel />
        </div>
      ) : (
        <div>
          <Home />
        </div>
      )}
    </>
  );
}

export default Private;
