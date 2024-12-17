import AudioReactiveParticles from "../compnent/avatar";
import CardLayout from "../compnent/CardLayout";
import "../style/card.css";

// export default function GridLayout() {
//   return (
//     <div className="mx-auto p-4 container">
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
//         {/* Left column */}
//         <div className="space-y-2">
//           {/* Circle */}
//           <div className="h-1/2 w-full flex items-center justify-center text-white w-full mx-auto">
//             <AudioReactiveParticles />
//           </div>

//           {/* Square */}
//           <div className="flex items-center justify-center text-white w-full h-1/3 mx-auto">
//               <CardLayout position="left" />
//           </div>
//         </div>

//         {/* Right column - Rectangle */}
//         <div className="bg-gray-700 h-screen flex items-center justify-center text-white">
//           information about anything else
//         </div>
//       </div>
//     </div>
//   )
// }

export default function GridLayout() {
  return (
    <div className="mx-auto p-4 w-screen h-screen">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left column */}
        <div className="space-y-4">
          {/* Circle */}
          <div className="aspect-square rounded-full flex items-center justify-center text-white w-full max-w-md mx-auto">
            <AudioReactiveParticles />
          </div>

          {/* Square */}
          <div className="aspect-square flex items-center justify-center text-white w-full h-1/3">
            {/* <CardLayout position="left" /> */}
            <div className="custom-shape all p-1">
              <span className="timeline"></span>
              <div className="border-span all">
                {/* Profile section */}
                <div className="ml-6 p-8">
                  <h3 className="text-cyan-400 text-xl mb-6">PROFILE</h3>

                  <div className="flex gap-8 items-start">
                    {/* Profile Icon */}
                    <div className="w-32 h-32 flex-shrink-0 border-2 border-cyan-500/50 rounded-sm">
                      <svg
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        className="w-full h-full text-cyan-500/50"
                        strokeWidth="1"
                      >
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
                      </svg>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <h3 className="text-red-400 text-2xl font-semibold mb-1">
                        RAJNIKANT
                      </h3>
                      <p className="text-cyan-400 text-sm mb-4">
                        RAJNIKANT
                      </p>
                      <p className="text-gray-300 leading-relaxed">
                        hello
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right column - Rectangle */}
        <div className="min-h-[600px] flex items-center justify-center text-white">
          information about anything else
        </div>
      </div>
    </div>
  )
}



