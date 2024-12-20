import React from 'react';
import AudioReactiveParticles from './avatar'; // Ensure the path to avatar is correct
import { motion } from 'framer-motion'; // Ensure this package is installed
import Markdown from './mark-down'; // Path to your Markdown component

const GradientBorderCard = ({ content }) => {
  const markdownText = `
# React Markdown Example

- Some text
- Some other text

## Subtitle

### Additional info

This is a [link](https://github.com/remarkjs/react-markdown)
`;
  return (

   <>
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
              {content.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{
                    opacity: 0,
                    y: item.direction === 'up' ? 20 : item.direction === 'down' ? -20 : 0,
                    x: item.direction === 'left' ? 20 : item.direction === 'right' ? -20 : 0,
                  }}
                  animate={{ opacity: 1, y: 0, x: 0 }}
                  transition={{ delay: item.delay || 0.2 * index, duration: 0.5 }}
                  className="text-xl md:text-2xl font-light"
                >
                  {/* Render Markdown */}
                  <Markdown content={markdownText} />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GradientBorderCard;