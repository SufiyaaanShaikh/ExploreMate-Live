import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../config/axiosConfig";
import toast from "react-hot-toast";
import Header from "../Header";
import userIcon from "../../images/user.webp";

const TripPage = () => {
  const { tripId } = useParams();
  const [trip, setTrip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const [message, setMessage] = useState("");
  const [sendingMessage, setSendingMessage] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    if (tripId) {
      fetchTripDetails();
      fetchCurrentUser();
    }
  }, [tripId]);

  const fetchTripDetails = async () => {
    try {
      const response = await api.get(`/trips/${tripId}`);
      setTrip(response.data.data);
    } catch (error) {
      toast.error("Failed to fetch trip details");
      console.error("Error fetching trip:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCurrentUser = async () => {
    try {
      const response = await api.get("/user/me");
      setCurrentUser(response.data);
    } catch (error) {
      console.error("Error fetching current user:", error);
    }
  };

  const handleContactCreator = () => {
    // Don't show modal if it's the user's own trip
    if (currentUser && trip && currentUser._id === trip.user._id) {
      toast.error("You cannot contact yourself for your own trip");
      return;
    }
    setShowMessageModal(true);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    if (!message.trim()) {
      toast.error("Please enter a message");
      return;
    }
    
    setSendingMessage(true);
    
    try {
      await api.post(`/messages/connect/${tripId}`, { content: message });
      toast.success("Connection request sent successfully!");
      setShowMessageModal(false);
      setMessage("");
    } catch (error) {
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Failed to send connection request");
      }
      console.error("Error sending message:", error);
    } finally {
      setSendingMessage(false);
    }
  };

  const isOwnTrip = currentUser && trip && currentUser._id === trip.user._id;

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gradient-to-b from-blue-50 to-white">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
      </div>
    );
  }

  if (!trip) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col items-center justify-center p-6">
        <div className="text-6xl mb-4">🚫</div>
        <h2 className="text-2xl font-bold text-gray-700 mb-2">
          Trip Not Found
        </h2>
        <p className="text-gray-500">
          The trip you're looking for doesn't exist or has been removed.
        </p>
      </div>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen pt-20 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Hero Section */}
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden mb-8">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 h-32 md:h-48 flex items-end">
              <div className="w-full p-6 md:p-8 bg-white/20 backdrop-blur-sm">
                <h1 className="text-3xl md:text-4xl font-bold text-white">
                  {trip.title}
                </h1>
              </div>
            </div>
            <div className="p-6 md:p-8">
              <p className="text-lg text-gray-700 italic border-l-4 border-blue-400 pl-4 py-2 bg-blue-50 rounded-r-lg">
                {trip.description}
              </p>
            </div>
          </div>

          {/* Content Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Trip Details Card */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8 h-full transform hover:scale-[1.01] transition-transform duration-300">
                <div className="flex items-center mb-6">
                  <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-blue-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7"
                      />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    Trip Details
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="text-2xl text-blue-600 mr-3">📍</div>
                      <div>
                        <p className="text-sm text-gray-500 uppercase tracking-wider">
                          Destination
                        </p>
                        <p className="text-lg font-medium text-gray-800">
                          {trip.destination}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="text-2xl text-blue-600 mr-3">👥</div>
                      <div>
                        <p className="text-sm text-gray-500 uppercase tracking-wider">
                          Group
                        </p>
                        <p className="text-lg font-medium text-gray-800">
                          {trip.group}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="text-2xl text-blue-600 mr-3">⏳</div>
                      <div>
                        <p className="text-sm text-gray-500 uppercase tracking-wider">
                          Duration
                        </p>
                        <p className="text-lg font-medium text-gray-800">
                          {trip.duration}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="text-2xl text-blue-600 mr-3">📅</div>
                      <div>
                        <p className="text-sm text-gray-500 uppercase tracking-wider">
                          Start Date
                        </p>
                        <p className="text-lg font-medium text-gray-800">
                          {trip.startDate
                            ? new Date(trip.startDate).toLocaleDateString(
                                "en-US",
                                {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                }
                              )
                            : "Not specified"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="text-2xl text-blue-600 mr-3">📅</div>
                      <div>
                        <p className="text-sm text-gray-500 uppercase tracking-wider">
                          End Date
                        </p>
                        <p className="text-lg font-medium text-gray-800">
                          {trip.endDate
                            ? new Date(trip.endDate).toLocaleDateString(
                                "en-US",
                                {
                                  month: "short",
                                  day: "numeric",
                                  year: "numeric",
                                }
                              )
                            : "Not specified"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* User Profile Card */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl shadow-lg p-6 h-full transform hover:scale-[1.01] transition-transform duration-300">
                <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                  Trip Creator
                </h2>

                {trip.user ? (
                  <div className="flex flex-col items-center">
                    <div className="relative w-32 h-32 mb-4">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full opacity-50 blur-md"></div>
                      <img
                        src={
                          trip.user.profilePhoto ||
                          userIcon
                        }
                        alt={trip.user.name}
                        className="relative z-10 w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                      />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800">
                      {trip.user.name}
                    </h3>
                    <p className="text-gray-500 mb-4">Trip Creator</p>

                    <button 
                      className={`mt-4 px-4 py-2 rounded-full font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors ${
                        isOwnTrip 
                          ? "bg-gray-300 text-gray-700 cursor-not-allowed" 
                          : "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500"
                      }`}
                      onClick={handleContactCreator}
                      disabled={isOwnTrip}
                    >
                      {isOwnTrip ? "Your Trip" : "Contact Creator"}
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-center">
                    <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-12 w-12 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                    </div>
                    <p className="text-gray-500">
                      User information not available
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-wrap gap-4 justify-center">
            <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors shadow-md flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              Save Trip
            </button>
            <button className="px-6 py-3 bg-white text-gray-700 rounded-lg font-medium hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2 transition-colors shadow-md border border-gray-200 flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                />
              </svg>
              Share Trip
            </button>
          </div>
        </div>
      </div>

      {/* Message Modal */}
      {showMessageModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 relative">
            <button
              onClick={() => setShowMessageModal(false)}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
             <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Connect with Trip Creator
            </h3>

            <div className="mb-4">
              <p className="text-gray-600 mb-2">
                Your message will be sent to{" "}
                <span className="font-semibold">{trip.user?.name}</span> about
                their trip to{" "}
                <span className="font-semibold">{trip.destination}</span>.
              </p>
            </div>

            <form onSubmit={handleSendMessage}>
              <div className="mb-4">
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  Your Message
                </label>
                <textarea
                  id="message"
                  rows="5"
                  className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Introduce yourself and explain why you're interested in connecting..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                ></textarea>
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowMessageModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                  disabled={sendingMessage}
                >
                  {sendingMessage ? "Sending..." : "Send Message"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default TripPage;