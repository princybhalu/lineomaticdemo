import React from 'react';
import AudioReactiveParticles from './avatar'; // Ensure the path to avatar is correct
import { motion } from 'framer-motion'; // Ensure this package is installed
import Markdown from './mark-down'; // Path to your Markdown component

const GradientBorderCard = ({ children }) => {
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

      {/* Radial Blur Overlays */}
      <div className="radial-blur-overlay" />
      <div className="radial-blur-overlay-bottom-left" />
      <div className="radial-blur-overlay-top-right" />
      <div className="radial-blur-overlay-bottom-right" />
      {/* Gradient Border Card */}
      <div className="gradient-border-card m-8">
        <div className="card-content text-white overflow-y-auto">
          {/* Dynamically Render Content */}
         {children}
        </div>
      </div>
    </>
  );
};

export default GradientBorderCard;
