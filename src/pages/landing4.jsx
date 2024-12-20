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
import AudioReactiveParticles from "../component/avatar";

const GradientBorderCard = () => {
  return (
    <div className="w-screen h-screen flex relative">
      <div className="w-full h-full flex flex-col justify-center items-center">
        <div className="h-1/2 w-3/4">
          <AudioReactiveParticles />
        </div>
      </div>
      <div className="w-full h-full flex flex-col justify-center items-center p-12 relative">
        <div className="gradient-border-card m-8">
          <div className="radial-blur-overlay" />
          <div className="card-content" />
        </div>
      </div>
    </div>
  );
};

export default GradientBorderCard;

