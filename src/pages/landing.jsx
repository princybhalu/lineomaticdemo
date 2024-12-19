import { useEffect, useRef, useState } from "react";
import AudioReactiveParticles from "../compnent/avatar";
import CardLayout from "../compnent/CardLayout";
import "../style/card.css";
import ProfileCard from "../compnent/a";


    
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
          <div className="aspect-square flex items-center justify-center text-white w-full h-1/3">
            {/* <CardLayout position="left" /> */}
            <CardLayout cardTitle={"INTERACTIVITY"} position="left" componentsConfig={componentsConfig} />
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



