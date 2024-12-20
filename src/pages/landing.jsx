import { useEffect, useRef, useState } from "react";
import AudioReactiveParticles from "../component/l2";
import CardLayout from "../component/CardLayout";
import "../style/card.css";
import ProfileCard from "../component/a";
import AnimatedBackgroundWithCards from "./landing3";

    
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
    comp: ProfileCard,
    compProps: {
      title: "PROFILE",
      description: "This is the first card.",
    },
  },
];


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
          <div className="aspect-square flex items-center justify-center text-white w-full h-1/3" 
          style={{
            border: "4px solid",

            borderImageSource: "linear-gradient(131.72deg, #00AEEF 1.01%, rgba(0, 174, 239, 0) 49.54%, #00AEEF 98.07%)"
            
          }}>
            {/* <CardLayout position="left" /> */}
            {/* <CardLayout cardTitle={"INTERACTIVITY"} position="left" componentsConfig={componentsConfig} /> */}
            {/* <AnimatedBackgroundWithCards /> */}
          </div>
        </div>

        {/* Right column - Rectangle */}
        {/* <div className="flex items-center justify-center text-white">
         <AnimatedBackgroundWithCards />
        </div> */}
      </div>
    </div>
  )
}



