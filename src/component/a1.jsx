export default function ProfileCard({
    name = "RAJNIKANT",
    role = "CTO OF COMPANY",
    description = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua."
  }) {
    return (
      <div className="w-full max-w-4xl bg-[#000510] p-2 relative">
        {/* Decorative side element with clip path */}
        <div className="absolute left-0 top-0 h-full w-full bg-white [clip-path:polygon(20px_0,calc(100%-20px)_0,100%_20px,100%_calc(100%-20px),calc(100%-20px)_100%,20px_100%,0_calc(100%-20px),0_20px)]">
        </div>
  
        {/* Main content container */}
        <div className="relative bg-black w-full">
          {/* Profile section */}
          <div className="p-8">
            <h3 className="text-cyan-400 text-xl mb-6">PROFILE</h3>
  
            <div className="flex gap-8 items-start">
              {/* Profile Icon */}
              <div className="w-32 h-32 flex-shrink-0 border-2 border-cyan-500/50 rounded-sm">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  className="w-full h-full text-cyan-500/50"
                  strokeWidth="1"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
                </svg>
              </div>
  
              {/* Content */}
              <div className="flex-1">
                <h3 className="text-red-400 text-2xl font-semibold mb-1">
                  {name}
                </h3>
                <p className="text-cyan-400 text-sm mb-4">
                  {role}
                </p>
                <p className="text-gray-300 leading-relaxed">
                  {description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  