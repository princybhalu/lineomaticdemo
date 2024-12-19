import { ReactNode } from "react";

export default function CardFrame({
  position = "left",
  children,
}) {
  return (
    <div className="p-8 flex justify-center items-center">
      {/* Border Container */}
      <div className="relative w-96 border border-[#85B0BF] p-6">
        {/* Title - Legend-like Effect */}
        <div
          className={`uppercase absolute top-[-10px] ${
            position === "left" ? "left-4" : "right-4"
          } bg-black px-2 text-sm text-[#7C8FA4]`}
        >
          {"Profile"}
        </div>

        <div className="h-28">{children}</div>
      </div>
 </div>
);
}