import React from 'react';

function VideoNameCard() {
  return (
    <div
      className="absolute group w-[173px] text-right"
      style={{ top: '150px', right: '-195px' }}
    >
      {/* Glass effect background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-800/50 to-gray-900/50 rounded-2xl backdrop-blur-sm" />

      {/* Content container */}
      <div className="relative p-5 rounded-2xl border border-gray-700/50">
        {/* Name */}
        <h2 className="text-[#00BFFF] text-lg font-bold mb-1">RAJNIKANT</h2>

        {/* Title */}
        <p className="text-white text-sm">CTO OF COMPANY</p>

        {/* Reflection effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-transparent via-white/5 to-transparent rounded-2xl pointer-events-none" />
      </div>
    </div>
  );
}

export default VideoNameCard;
