import { ReactNode } from "react";
import CardFrame from "./CardFrame";
import ProfileCard from "./a"
import A1 from "./a1"

export default function CardLayout({
  position = "right",
  children,
}) {
  return (
    <div className="flex m-3 gap-3">
      {position === "left" && (
        // <div className="max-w-[30px] border border-[#85B0BF] border-r-0">
             <div className="max-w-[30px] bg-teal-900/95 p-6 relative border-red-500/80 [clip-path:polygon(0_0,0_20px,20px_0,100%_0,100%_100%,0_100%)] h-full"></div>
        // </div>
      )}

      <div
        className={`  border border-[#85B0BF] ${
          position === "left" ? "border-l-0" : "border-r-0"
        }`}
      >
        {/* <CardFrame position="left" /> */}
        <A1 />
      </div>

      {position === "right" && (
        <div className=" max-w-[10px] p-[0.5rem] border border-[#85B0BF] border-l-0"></div>
      )}
 </div>);
}