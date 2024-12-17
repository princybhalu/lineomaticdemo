import AudioReactiveParticles from "../compnent/avatar";
import CardLayout from "../compnent/CardLayout";
import a1 from "../compnent/a11.jpg";

export default function GridLayout() {
  return (
    <div className="relative w-screen h-screen overflow-hidden">
    <img src={a1} className="h-full w-full" alt="Background" />
    <div className="absolute top-0 left-2 w-full h-3/4">
      <AudioReactiveParticles />
    </div>
  </div>
  )
}



