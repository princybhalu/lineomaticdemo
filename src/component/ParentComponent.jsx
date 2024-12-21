import AudioReactiveParticles from "./AudioReactiveParticles";
import { useEffect, useRef, useState } from "react";
import CardLayout from "../component/CardLayout";
import "../style/card.css";
import ProfileCard from "../component/a";
// import AnimatedBackgroundWithCards from "./landing3";

export default function ParentComponent() {
  const [state, setState] = useState("loading"); // Default state is "loading"

  useEffect(() => {
    // Example: Change state after 3 seconds to "not listening"
    const timer = setTimeout(() => {
      setState("not listening"); // Change state to "not listening"
    }, 3000);

    // Simulate microphone detection and switch state to "listening"
    navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then(() => {
        setState("listening");
      })
      .catch((err) => {
        console.log("Error accessing microphone:", err);
        setState("not listening");
      });

    // Cleanup timer when component unmounts or state changes
    return () => clearTimeout(timer);
  }, []);

  return (
    <div>
      {/* Pass the current state to AudioReactiveParticles */}
      <AudioReactiveParticles state={state} />
    </div>
  );
}
