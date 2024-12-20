// export default function GridBackground() {
//     return (
//       <div className="relative w-full min-h-screen bg-black p-8">
//         <div
//           className="relative w-full h-full rounded-3xl overflow-hidden"
//           style={{
//             background: 'black',
//             padding: '1px', // For gradient border
//             backgroundImage: 'linear-gradient(to right, #0ea5e9, gray)',
//           }}
//         >
//           {/* Gradient border container */}
//           <div className="absolute inset-0 rounded-3xl opacity-20 blur-sm"
//             style={{
//               background: 'linear-gradient(to right, #0ea5e9, gray)',
//             }}
//           />

//           {/* Content container with grid */}
//           <div
//             className="relative w-full h-full min-h-[500px] rounded-3xl bg-black"
//             style={{
//               backgroundImage: `
//                 linear-gradient(to right, rgba(75, 85, 99, 0.2) 1px, transparent 1px),
//                 linear-gradient(to bottom, rgba(75, 85, 99, 0.2) 1px, transparent 1px)
//               `,
//               backgroundSize: '80px 80px',
//               backgroundPosition: 'center center'
//             }}
//           >
//             {/* Your content goes here */}
//           </div>
//         </div>
//       </div>
//     )
//   }

// import React from 'react';
// import AudioReactiveParticles from "../component/avatar";

// export default function GradientBorderCard() {
//     return (
//         <>
//             <div className='w-screen h-screen flex relative'>
//                 <div className='w-full h-full flex flex-col justify-center items-center'>
//                     <div className='h-1/2 w-3/4 '>
//                         <AudioReactiveParticles />
//                     </div>
//                 </div>
//                 <div className='w-full h-full flex flex-col justify-center items-center p-12'>
//                     <div className="gradient-border-card m-8">
//                         <div className="card-content"></div>
//                     </div>
//                     <div className="radial-blur"></div>
//                 </div>
//             </div>
//         </>
//     );
// }

import React from 'react';
import AudioReactiveParticles from '../component/avatar';
import CameraView from '../component/CameraView';
import VideoNameCard from '../component/video-name-card';

const GradientBorderCard = () => {
  return (
    <>
      <div className="w-screen h-screen flex relative rounded-3xl">
        <div className="w-full h-full flex flex-col justify-center items-center">
          <div className="h-1/2 w-3/4">
            <AudioReactiveParticles />
          </div>
          <div className="w-3/4 h-1/2 mx-auto flex flex-col justify-center items-center ">
            <div className="relative h-[400px] w-[600px] p-4">
              <div className="h-full w-full mb-5">
                <div className="gradient-border-card m-8 ">
                  <div className="card-content">
                    <div className="p-5 h-full w-full relative">
                      <CameraView />
                      <div className="w-full bg-gray-50 ">
                        <div className="absolute right-40 top-[150px]">
                          {/* Base line */}
                          <div
                            className="absolute h-[2px] w-[190px] bg-white origin-left drop-shadow-2xl"
                            style={{
                              animation: 'drawLine 1s linear forwards',
                            }}
                          />
                          {/* Rotated line */}
                          <div className="absolute h-[2px] w-[65px] bg-white origin-left rotate-[120deg] drop-shadow-2xl animate-draw-line-delayed" />

                          {/* Circle group */}
                          <div
                            className="absolute -translate-x-1/2 -translate-y-1/2"
                            style={{
                              top: `calc(65px * sin(120deg))`,
                              left: `calc(65px * cos(120deg))`,
                              animation: 'fadeInCircle 1s linear 0.5s forwards',
                            }}
                          >
                            {/* Outer glow */}
                            <div className="absolute w-16 h-16 bg-blue-400/20 rounded-full -translate-x-1/2 -translate-y-1/2 blur-xl" />
                            {/* Middle glow */}
                            <div className="absolute w-12 h-12 bg-blue-500/30 rounded-full -translate-x-1/2 -translate-y-1/2 blur-lg" />
                            {/* Inner circle */}
                            <div className="absolute w-8 h-8 bg-blue-700 rounded-full -translate-x-1/2 -translate-y-1/2" />
                            {/* Center dot */}
                            <div className="absolute w-[1.2rem] h-[1.2rem] bg-blue-400 rounded-full -translate-x-1/2 -translate-y-1/2" />
                            <div className="absolute w-2 h-2  bg-blue-700 rounded-full -translate-x-1/2 -translate-y-1/2" />
                          </div>
                        </div>
                        {/* Add Keyframe Animations */}
                        <style jsx>{`
                          @keyframes drawLine {
                            0% {
                              transform: scaleX(0);
                              opacity: 0;
                            }
                            100% {
                              transform: scaleX(1);
                              opacity: 1;
                            }
                          }

                          @keyframes drawLineAndStay {
                            0% {
                              transform: scaleX(0) rotate(120deg);
                              opacity: 0;
                            }
                            100% {
                              transform: scaleX(1) rotate(120deg);
                              opacity: 1;
                            }
                          }

                          @keyframes fadeInCircle {
                            from {
                              opacity: 0;
                              transform: scale(0.8);
                            }
                            to {
                              opacity: 1;
                              transform: scale(1);
                            }
                          }
                        `}</style>
                      </div>
                    </div>
                  </div>
                </div>
                <VideoNameCard />
              </div>
            </div>
          </div>
        </div>
        {/* <div className="w-full h-full flex flex-col justify-center items-center p-12 relative">
          <div className="gradient-border-card m-8">
            <div className="radial-blur-overlay" />
            <div className="card-content" />
          </div>
        </div> */}
      </div>
    </>
  );
};

export default GradientBorderCard;
