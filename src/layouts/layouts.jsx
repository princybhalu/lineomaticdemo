import React, { useState } from 'react';
// import Navbar from '../components/navbar/Navbar';
// import LeftSidebar from '../components/left-sidebar/left-sidebar';
import { useSelector } from 'react-redux';

const Layout = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div
      className=""
    >
      {/* Navbar Component */}
      {/* <Navbar
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      /> */}

      {/* Main Content Area */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar - Only rendered for certain routes */}
        {!(
          window.location.pathname === '/' ||
          window.location.pathname === '/profiling'
        ) && (
          window.location.pathname === '/' ||
          window.location.pathname === '/profiling'
         
        )}

        {/* Children Content */}
        <main className="flex-1 w-full overflow-auto">{children}</main>

        {/* OrbitTwo Avatar Component */}
      </div>
    </div>
  );
};

export default Layout;
