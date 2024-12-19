// 'use client'

// import React, { useState } from 'react';
// import AudioReactiveParticles from '../compnent/avatar';
// import ProfileCard from '../compnent/a';

// export default function Landing1() {
//   const [isSet, setIsSet] = useState(false);

//   return (
//     <div className="w-full h-screen bg-gray-900 overflow-hidden">
//       <div className={`w-full h-full flex transition-transform duration-500 ease-in-out ${isSet ? '-translate-x-1/3' : 'translate-x-0'}`}>
//         <div className={`${isSet ? 'w-1/2' : 'w-full'} h-full flex flex-col justify-center items-center transition-all duration-500 ease-in-out`}>
//           <div className={`w-full ${isSet ? 'max-w-xl' : 'max-w-2xl'} h-1/2 transition-all duration-500 ease-in-out`}>
//             <AudioReactiveParticles />
//           </div>
//           <div className={`w-full ${isSet ? 'max-w-md' : 'max-w-md'} h-1/2 transition-all duration-500 ease-in-out`}>
//             <ProfileCard setted={setIsSet} />
//           </div>
//         </div>
//         <div className={`bg-gray-800 p-6 text-white transform transition-transform duration-500 ease-in-out ${isSet ? 'translate-x-0 w-1/2 h-full' : 'translate-x-full hidden'}`}>
//           <h2 className="text-2xl font-bold mb-4">Retrieved Data</h2>
//           <p>Your retrieved data will be displayed here.</p>
//         </div>
//       </div>
//     </div>
//   );
// }

'use client'

import React, { useState } from 'react';
import AudioReactiveParticles from '../component/avatar';
import ProfileCard from '../component/welcomeCard';
import CameraCard from "../component/a";
import CardLayout from "../component/CardLayout";
import VisitorManagementChart from "../component/sample";

export  function WaterfallInfo() {
  return (
    <div className="text-gray-200 p-3 rounded-lg">
      <h1 className="text-lg font-semibold mb-1 flex items-center gap-2">
        <span className="text-gray-400">#</span> Information about Waterfall chart
      </h1>
      
      <div className="space-y-3">
        <p className="leading-relaxed">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
          exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute 
          irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla 
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia 
          deserunt mollit anim id est laborum.
        </p>

        <p className="leading-relaxed">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
          exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute 
          irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla 
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia 
          deserunt mollit anim id est laborum.
        </p>

        <p className="leading-relaxed">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor 
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
          exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute 
          irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla 
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia 
          deserunt mollit anim id est laborum.
        </p>
      </div>
    </div>
  )
}

export default function Landing1() {
  const [isSet, setIsSet] = useState(false);

const componentsConfig = [
  {
    isLayout: false,
    comp: VisitorManagementChart,
  }
];

const componentsConfig1 = [
  {
    isLayout: true,
    comp: CameraCard,
    compProps: {
      setted: setIsSet,
      title: "Profile"
    },
  },
];
  

  return (
    <div className="w-full h-screen bg-black overflow-hidden">
      <div className={`w-full h-full flex transition-all duration-500 ease-in-out ${isSet ? 'space-x-4' : ''}`}>
        <div className={`h-full flex flex-col justify-center items-center transition-all duration-500 ease-in-out ${isSet ? 'w-3/5' : 'w-full'}`}>
          <div className={`w-full max-w-2xl h-1/2 transition-all duration-500 ease-in-out ${isSet ? 'scale-90' : ''}`}>
            <AudioReactiveParticles isSet={isSet} />
          </div>
          <div className={`w-full max-w-md h-1/2 transition-all duration-500 ease-in-out ${isSet ? 'scale-90' : ''}`}>
          <div className='aspect-square flex items-center justify-center text-white w-full h-1/3 mt-28'>
          <CardLayout height={"500px"} setted={setIsSet} cardTitle={"INTERACTIVITY"} position="left" componentsConfig={componentsConfig1} />
          </div>
          </div>
        </div>
        <div 
          className={`bg-black h-full p-6 text-white transition-all duration-500 ease-in-out overflow-y-auto
            ${isSet ? 'w-2/5 opacity-100' : 'w-0 opacity-0'}`}
        >
          <div className="aspect-square flex items-center justify-center text-white w-full">
          <CardLayout height={"700px"} cardTitle={"VMS"} position="left" componentsConfig={componentsConfig}/>
          </div>
        </div>
      </div>
    </div>
  );
}

