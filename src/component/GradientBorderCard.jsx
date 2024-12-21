import React from 'react';
import AudioReactiveParticles from './avatar'; // Ensure the path to avatar is correct
import { motion } from 'framer-motion'; // Ensure this package is installed
import Markdown from './mark-down'; // Path to your Markdown component

const directions = ['up', 'right', 'down', 'left']; // Define a set of default directions

const GradientBorderCard = ({ content }) => {
  return (
    <div className="w-screen h-screen flex">
      {/* Left Section with AudioReactiveParticles */}
      <div className="w-full h-full flex flex-col justify-center items-center z-3 overflow-hidden bg-black">
        <div className="h-1/2 w-3/4 z-3">
          <AudioReactiveParticles />
        </div>
      </div>
      {/* Right Section with Gradient Border Card */}
      <div className="w-full h-full flex flex-col justify-center items-center p-12 border-l border-solid border-[#919191] relative">
        {/* Radial Blur Overlays */}
        <div className="radial-blur-overlay" />
        <div className="radial-blur-overlay-bottom-left" />
        <div className="radial-blur-overlay-top-right" />
        <div className="radial-blur-overlay-bottom-right" />
        {/* Gradient Border Card */}
        <div className="gradient-border-card m-8">
          <div className="card-content text-white">
            {/* Dynamically Render Content */}
            <div className="flex flex-col space-y-8 text-center">
              {content.map((item, index) => {
                // Dynamically assign direction based on index, cycling through the directions
                const direction = directions[index % directions.length];
                
                return (
                  <motion.div
                    key={index}
                    initial={{
                      opacity: 0,
                      y: direction === 'up' ? 20 : direction === 'down' ? -20 : 0,
                      x: direction === 'left' ? 20 : direction === 'right' ? -20 : 0,
                    }}
                    animate={{ opacity: 1, y: 0, x: 0 }}
                    transition={{ delay: 0.2 * index, duration: 0.5 }} // Automatically calculated delay
                    className="text-xl md:text-2xl font-light"
                  >
                    {/* Render Markdown */}
                    <Markdown content={item.text} />
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GradientBorderCard;
