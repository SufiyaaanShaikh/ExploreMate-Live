import React from "react";

const SkeletonCard = () => {
  return (
    <div className="w-72 h-64 bg-white rounded-xl shadow-md p-4 animate-pulse">
      <div className="flex justify-center mb-4">
        <div className="w-16 h-16 rounded-full bg-gray-300" />
      </div>
      <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto mb-2"></div>
      <div className="h-3 bg-gray-200 rounded w-2/3 mx-auto mb-1"></div>
      <div className="h-3 bg-gray-200 rounded w-1/2 mx-auto mb-4"></div>
      <div className="h-10 bg-gray-300 rounded w-full mt-auto"></div>
    </div>
  );
};

export default SkeletonCard;
