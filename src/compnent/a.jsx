export default function ProfileCard({
    name = "RAJNIKANT",
    role = "CTO OF COMPANY",
    description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  }) {
    return (
      <div className="w-full max-w-2xl p-[1px] bg-gradient-to-r from-gray-900/30 to-gray-900/20 relative">
        {/* The card's border with clipped bottom-left corner */}
        <div className="absolute inset-0 border-8 border-red-500/80 
          [clip-path:polygon(0_0,0_20px,20px_0,100%_0,100%_100%,0_100%)]">
        </div>
  
        {/* The main content with clipped bottom-left corner */}
        <div className="bg-teal-900/95 p-6 relative 
          [clip-path:polygon(0_0,0_20px,20px_0,100%_0,100%_100%,0_100%)]">
          
          <h2 className="text-teal-400 text-xl mb-6">PROFILE</h2>
  
          <div className="flex gap-6 items-start">
            {/* Profile Icon */}
            <div className="w-32 h-32 flex-shrink-0">
              {/* Profile icon SVG can be added here */}
            </div>
  
            {/* Content */}
            <div className="flex-1">
              <h3 className="text-teal-400 text-2xl font-semibold mb-1">
                {name}
              </h3>
              <p className="text-teal-200 text-sm mb-4">
                {role}
              </p>
              <p className="text-gray-300 leading-relaxed">
                {description}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
  