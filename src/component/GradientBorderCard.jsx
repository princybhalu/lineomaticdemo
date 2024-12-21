// src/components/GradientBorderCard.js
import React from 'react';
import AudioReactiveParticles from './avatar'; // Ensure the path to avatar is correct

const GradientBorderCard = () => {
  return (
    <div className="w-screen h-screen flex">
      <div className="w-full h-full flex flex-col justify-center items-center z-3 overflow-hidden">
        <div className="h-1/2 w-3/4 z-3">
          <AudioReactiveParticles />
        </div>
      </div>
      <div className="w-full h-full flex flex-col justify-center items-center p-12 border-l border-solid border-[#919191] relative">
        <div className="radial-blur-overlay" />
        <div className="radial-blur-overlay-bottom-left" />
        <div className="radial-blur-overlay-top-right" />
        <div className="gradient-border-card m-8">
          <div className="card-content" />
        </div>
      </div>
    </div>
  );
};

export default GradientBorderCard;
