import UsersCards from "./UsersCards";
import ReviewsCards from "./ReviewsCards";
import TripsCards from "./TripsCards";

const AdminDashboard = ({ activeTab }) => {
  return (
    <div className="bg-white p-4 md:p-6 shadow-lg rounded-lg h-full flex flex-col">
      {activeTab === "Users" && <UsersCards />}
      {activeTab === "Trips" && <TripsCards />}
      {activeTab === "Reviews" && <ReviewsCards />}
    </div>
  );
};

export default AdminDashboard;