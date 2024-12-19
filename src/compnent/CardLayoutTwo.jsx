import { ReactNode, useEffect, useRef, useState } from "react";
import CardFrame from "./CardFrame";
import ProfileCard from "./a"
import A1 from "./a1"

export default function CardLayout({
  position ,
  children,
  cardTitle,
  componentsConfig,
  className
}) {
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

  const customClipPath = `polygon(0px 0px, 30% 6%, 30% 95%, 0px 100%)`;
  const customClipPathTwo = `polygon(70% 5%, 100% 0%, 100% 100%, 68% 94%)`;

  const leftDivTop = `{cardHeight * 0.40}px`; // 40% of card height
  const rightDivTop = `${cardHeight * 0.10}px`; // 10% of card height

  console.log(cardHeight, "cardHeight");

  return (
    <div className="custom-shape all p-1"ref={cardRef}>
      <span className={`absolute ${position === "left" ? "left-[25px]" : "right-[25px]"} top-0  h-full  w-[5px] bg-black z-10`}></span>
    <div className={`border-span all  ${className}`} >
      <div className={`bg-[#1D3D4C] text-[#00D4FF] flex p-1 w-full ${position === "right" ? "justify-end" : ""
            } custom-clip-top-right-left`}>
        <div
          className={`bg-[#294D5F] min-h-[90%] w-3  ${position === "right" ? "mr-5 ml-1 order-2" : "ml-5 mr-1"
            }`}
        ></div>
        <div
          className={`bg-[#294D5F] min-h-[90%] w-2  ${position === "right" ? "mr-1 ml-1 order-1  " : "ml-1 mr-1"
            }`}
        ></div>
        <h3
          className={`uppercase text-sm ml-2 tracking-wide font-semibold w-100 ${position === "left" ? "text-left" : "text-right"
            }`}
        >
          {cardTitle}
        </h3>
      </div>
      <span className={`absolute ${position === "left" ? "left-[25px]" : "right-[25px]"} top-0  h-full  w-[5px] bg-black z-10`}></span>




      {/* Profile section */}
      <div className="ml-6 p-8">
        {/* left */}
        {position === "left" &&
        <div
          className="absolute left-0 w-10 bg-[#78a2b4] shadow-lg hover:bg-[#5f8e9f] transition-colors duration-300"
          style={{
            height: `${cardHeight * 0.40}px`, // Dynamically set height
            top: leftDivTop, // Dynamically set top position
            clipPath: customClipPath, // Dynamically calculated clip-path
          }}
        ></div>
        }
        {componentsConfig.map((item, index) => {
        const { isLayout, comp: Component, compProps = {} } = item;

        // Render only if isLayout is true and Component is valid
        if (isLayout && Component) {
          return <div className=" flex justify-center items-center">
            {/* Border Container */}
            <div className="relative w-96 border border-[#85B0BF] p-4">
              {/* Title - Legend-like Effect */}
              <div
                className={`uppercase absolute top-[-10px] ${
                  position === "left" ? "left-4" : "right-4"
                } bg-black px-2 text-sm text-[#7C8FA4]`}
              >
                {compProps.title}
              </div>
      
              <Component key={index} {...compProps} />
            </div>
            </div>;
        }

        return <Component key={index} {...compProps} />; 
      })}
        {/* righht */}
        {position === "right" &&
        <div
                className="absolute right-0 w-10 bg-[#78a2b4] shadow-lg hover:bg-[#5f8e9f] transition-colors duration-300"
                style={{
                  height: `${cardHeight * 0.40}px`, // Dynamically set height
                  top: rightDivTop, // Dynamically set top position
                  clipPath: customClipPathTwo, // Dynamically calculated clip-path
                }}
              ></div>
}
      </div>
    </div>
  </div>
 );
}