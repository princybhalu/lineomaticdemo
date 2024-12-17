import { ReactNode } from "react";
import CardFrame from "./CardFrame";

export default function CardLayout({
  position = "right",
  children,
}) {
  return (
    <div className="flex m-3 gap-3">
      {position === "left" && (
        <div className="max-w-[10px] p-[0.5rem] border border-[#85B0BF] border-r-0"></div>
      )}

      <div
        className={`  border border-[#85B0BF] ${
          position === "left" ? "border-l-0" : "border-r-0"
        }`}
      >
        <CardFrame position="left" />
      </div>

      {position === "right" && (
        <div className=" max-w-[10px] p-[0.5rem] border border-[#85B0BF] border-l-0"></div>
      )}
 </div>);
}