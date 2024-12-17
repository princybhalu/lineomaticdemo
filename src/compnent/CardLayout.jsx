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
        <div className="custom-shape topleft w-[30px] border-r-0 border-red-500">
          <div className="border-span topleft h-[1/2] w-[20px] bg-blue-500">
          </div>
        </div>
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