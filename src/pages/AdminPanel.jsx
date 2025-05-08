import { useContext, useEffect, useState } from "react";
import Sidebar from "../components/Admin/Sidebar";
import AdminDashboard from "../components/Admin/AdminDashboard";
import { motion } from "framer-motion";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import api from "../config/axiosConfig";

const AdminPanel = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Users");
  const { handleLogout } = useContext(AuthContext);
  const [currentUser, setCurrentUser] = useState(null);
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/user/me");
        setCurrentUser(res.data);
      } catch (error) {
        console.error("Error fetching user:", error);
        setCurrentUser(null);
      }
    };
    fetchUser();
  }, []);
  return (
    <>
 
      <div className="h-screen flex flex-col font-[Poppins] ">
             {/* Header */}
      <div className="bg-[#003dde] text-white px-8 p-4  text-lg font-semibold flex justify-between items-center shadow-md">
        <span className="text-xl">ExploreMates Admin</span>
        <button onClick={()=> {
           handleLogout();
           setCurrentUser(null)
           navigate("/login");
        }}>Logout</button>
      </div>
        {/* Main Content */}
        <div className="flex flex-1">
          <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="flex-1 p-6"
          >
            <AdminDashboard activeTab={activeTab} />
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default AdminPanel;
