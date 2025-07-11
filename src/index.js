import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider, useLocation } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";
import "./css/App.css";
import "./css/utility.css";
import Login from "./pages/Login";
// import Signup from "./pages/Signup";
import Feed from "./pages/Feed";
import Review from "./pages/Review";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";
import SingleReview from "./components/Review/SingleReview";
import EditProfile from "./pages/EditProfile";
import usersData from "./Data/usersData";
import TripPage from "./components/Profile/TripPage";
import Parent from "./pages/Parent";
import Private from "./pages/Private";
import EditWiki from "./components/Admin/EditWiki";
import Register from "./pages/Register";


const AppLayout = ({ children }) => {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return <>{children}</>;
};

const withLayout = (Component) => {
  return <AppLayout>{<Component />}</AppLayout>;
};

const root = ReactDOM.createRoot(document.getElementById("root"));

const allRoutes = createBrowserRouter([
  {
    path: "/",
    element: withLayout(Private),
  },
  {
    path: "/login",
    element: withLayout(Login),
  },
  {
    path: "/signup",
    element: withLayout(Register),
  },
  // {
  //   path: "/register",
  //   element: withLayout(Register),
  // },
  {
    path: "/feed",
    element: withLayout(Feed),
  },
  {
    path: "/user/:id",
    element: withLayout(Parent),
  },
  {
    path: "/review",
    element: withLayout(Review),
  },
  {
    path: "/single-review/:reviewId",
    element: withLayout(SingleReview),
  },
  {
    path: "/profile",
    element: withLayout(Parent),
  },
  {
    path: "/edit-profile",
    element: withLayout(EditProfile),
  },
  {
    path: "/trip/:tripId",
    element: withLayout(TripPage),
  },
  {
    path: "/edit-wiki/:destinationId",
    element: withLayout(EditWiki),
  },
]);

root.render(
  <>
    <Toaster position="top-center" reverseOrder={false} />
    <React.StrictMode>
      <AuthProvider usersData={usersData}>
        <RouterProvider router={allRoutes} />
      </AuthProvider>
    </React.StrictMode>
  </>
);

reportWebVitals();