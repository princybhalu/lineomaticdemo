// src/components/GradientBorderCard.js
import React from 'react';
import AudioReactiveParticles from './avatar'; // Ensure the path to avatar is correct
import { motion } from 'framer-motion'; // Ensure this package is installed
import DepartmentCard from './DepartmentCard';
import AdminCard from '../asset/admin-card';
import AdminLine from '../asset/admin-line';
import AdminHeader from '../asset/admin-header';
import HrCard from '../asset/hr-card'
import Markdown from './Markdown';
import List from '../asset/list';

const cardType = {
  admin: {
    Card: AdminCard,
    Header: AdminHeader,
    Line: AdminLine,
  },
  hr: {
    Card: HrCard,
    Header: AdminHeader,
    Line: AdminLine,
  },
}
const data = {
  basic_description: "Mainne har department ke manual workflows aur processes ko analyze kiya hai aur yeh bottlenecks identify kiye hain",
  department: [
    {
      key: "admin",
      text: "Visitor management me repeat visitor data ka record nahi hota, jo process ko inefficient banata hai. Housekeeping aur stationary procurement me manual tracking ke karan delays aur errors hote hain."
    },
    {
      key: "hr",
      text: "Recruitment aur onboarding approvals manual hain, jo hiring time ko unnecessarily increase karte hain. Attendance aur payroll reconciliation manually hone ki wajah se errors aur delays common hain."
    },
  ]
};
const markdownText = `
# React Markdown Example demo mdeojhsajfhuask

- Some text adaskgksag fas
- Some other text adHDNKJASHFJ DSGFSDdsgsdgsd

## Subtitle

### Additional info

This is a [link](https://github.com/remarkjs/react-markdown)
`;



const GradientBorderCard = ({ content }) => {

  return (
    <div className="w-screen h-screen flex ">
      <div className="w-full h-full flex flex-col justify-center items-center z-3 overflow-hidden bg-black">
        <div className="h-1/2 w-3/4 z-3">
          <AudioReactiveParticles />
        </div>
      </div>
      <div className="w-full h-full flex flex-col justify-center items-center p-12 border-l border-solid border-[#919191] relative">
        <div className="radial-blur-overlay" />
        <div className="radial-blur-overlay-bottom-left" />
        <div className="radial-blur-overlay-right-center" />
        <div className="gradient-border-card m-8">
          <div className="card-content" >
            <DepartmentCard cardType={cardType} />
            <div className='p-[10%] flex' style={{ color: "white" }}>
              <div>
                <List color='#447AE1' />
              </div>
              <div className='pl-5'>
                <div className="flex flex-col space-y-8">
                  {content.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{
                        opacity: 0,
                        y: item.direction === 'up' ? 20 : item.direction === 'down' ? -20 : 0,
                        x: item.direction === 'left' ? 20 : item.direction === 'right' ? -20 : 0,
                      }}
                      animate={{ opacity: 1, y: 0, x: 0 }}
                      transition={{ delay: item.delay || 0.2 * index, duration: 0.5 }}
                      className="text-xl md:text-2xl font-light"
                    >
                      {/* Render Markdown */}
                      <Markdown content={markdownText} />
                    </motion.div>
                  ))}
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default GradientBorderCard;
