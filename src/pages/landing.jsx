import { useEffect, useRef, useState } from "react";
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

  const cardRef = useRef(null);
  const [cardHeight, setCardHeight] = useState(0);

  useEffect(() => {
    // Update card height when the component mounts
    if (cardRef.current) {
      setCardHeight(cardRef.current.offsetHeight);
    }

    // Update card height on window resize
    const handleResize = () => {
      if (cardRef.current) {
        setCardHeight(cardRef.current.offsetHeight);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Dynamic clip-path based on the card height
  const customClipPath = `polygon(0px 0px, 30% 6%, 30% 95%, 0px 100%)`;
  const customClipPathTwo = `polygon(70% 5%, 100% 0%, 100% 100%, 68% 94%)`;

  const leftDivTop = `{cardHeight * 0.40}px`; // 40% of card height
  const rightDivTop = `${cardHeight * 0.10}px`; // 10% of card height

  console.log(cardHeight, "cardHeight");

  const position = 'left'

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

              <div className="border-span all" ref={cardRef}>
                {/* Parth  */}

                <div className="bg-[#1D3D4C] text-[#00D4FF] flex p-1 w-full custom-clip-top-right-left">
                  <div
                    className={`bg-[#294D5F] min-h-[90%] w-3  ${position === "right" ? "mr-1 ml-1 order-2" : "ml-5 mr-1"
                      }`}
                  ></div>
                  <div
                    className={`bg-[#294D5F] min-h-[90%] w-2  ${position === "right" ? "mr-1 ml-1 order-1  " : "ml-1 mr-1"
                      }`}
                  ></div>
                  <h3
                    className={`uppercase text-xl ml-2 tracking-wide font-semibold w-100 ${position === "left" ? "text-left" : "text-right"
                      }`}
                  >
                    {"cardTitle"}
                  </h3>
                </div>
                <span className="absolute top-0 left-[25px] h-full  w-[5px] bg-black z-10"></span>




                {/* Profile section */}
                <div className="ml-6 p-8">
                  {/* left */}
                  <div
                    className="absolute left-0 w-10 bg-[#78a2b4] shadow-lg hover:bg-[#5f8e9f] transition-colors duration-300"
                    style={{
                      height: `${cardHeight * 0.40}px`, // Dynamically set height
                      top: leftDivTop, // Dynamically set top position
                      clipPath: customClipPath, // Dynamically calculated clip-path
                    }}
                  ></div>
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



