import React from 'react';

function VideoNameCard({ userData }) {
  return (
    <div
      className="absolute group w-[10vh] text-right 
        lg:top-[10vh] lg:right-[-12vh] 
      "
    >
      {/* Glass effect background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-800/50 to-gray-900/50 rounded-2xl backdrop-blur-sm" />

      {/* Content container */}
      <div className="relative p-5 rounded-2xl border border-gray-700/50">
        {/* Name */}
        <h2 className="text-[#00BFFF] text-md lg:text-xl xl:text-2xl xl2:text-4xl font-bold mb-1">
          {userData.name}
        </h2>

        {/* Title */}
        <p className="text-white text-sm lg:text-lg xl:text-xl xl2:text-3xl">
          {userData.designation}
        </p>

        {/* Reflection effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/5 to-transparent rounded-2xl pointer-events-none" />
      </div>
    </div>
  );
}

export default VideoNameCard;

// xl:top-[8vh] xl:right-[-10vh] 
// xl2:top-[5vh] xl2:right-[-8vh]
