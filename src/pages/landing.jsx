import { useEffect, useRef, useState } from "react";
import AudioReactiveParticles from "../compnent/avatar";
import CardLayout from "../compnent/CardLayout";
import "../style/card.css";



    
const CardComponent = ({ title, description }) => (
  <div
    style={{
      border: "1px solid gray",
      padding: "10px",
      borderRadius: "8px",
      margin: "5px",
    }}
  >
    <h3>{title}</h3>
    <p>{description}</p>
  </div>
);

const ButtonComponent = ({ label, onClick }) => (
  <button
    style={{
      padding: "10px 15px",
      margin: "5px",
      backgroundColor: "teal",
      color: "white",
      border: "none",
      borderRadius: "5px",
      cursor: "pointer",
    }}
    onClick={onClick}
  >
    {label}
  </button>
);

const componentsConfig = [
  {
    isLayout: true,
    comp: CardComponent,
    compProps: {
      title: "Card One",
      description: "This is the first card.",
    },
  },
  {
    isLayout: false, // This will not render
    comp: CardComponent,
    compProps: {
      title: "Card Two",
      description: "This card will not show because isLayout is false.",
    },
  },
  {
    isLayout: true,
    comp: ButtonComponent,
    compProps: {
      label: "Click Me",
      onClick: () => alert("Button clicked!"),
    },
  },
];

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
            <CardLayout cardTitle={"umesh"} position="right" componentsConfig={componentsConfig} />
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



