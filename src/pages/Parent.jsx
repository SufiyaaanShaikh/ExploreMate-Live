import React, { useState } from 'react'
import { useLocation, useParams } from 'react-router-dom';
import Profile from './Profile';
import UserProfile from './UserProfile';

function Parent() {
    const location = useLocation();
    const params = useParams();
    const viewingUserId = params.id;
    const [trips, setTrips] = useState([]);
    const isProfilePage = location.pathname === "/profile" || location.pathname === "/";
  return (
    <>
   
    <div>
    {
        isProfilePage ? <Profile trips={trips} setTrips={setTrips}/> : <UserProfile trips= {trips} setTrips={setTrips} />
    }
    </div>

    
    </>
  )
}

export default Parent