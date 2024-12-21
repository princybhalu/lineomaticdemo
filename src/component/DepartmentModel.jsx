import React, { useState } from 'react';
import AudioReactiveParticles from './avatar';
import { motion } from 'framer-motion';
import DepartmentCard from './DepartmentCard';
import AdminCard from '../asset/admin/admin-card';
import AdminLine from '../asset/admin/admin-line';
import AdminHeader from '../asset/admin/admin-header';
import HrHeader from '../asset/hr/hr-header';
import HrLine from '../asset/hr/hr-line';
import HrCard from '../asset/hr/hr-card'
import ItCard from '../asset/it/it-card'
import ItHeader from '../asset/it/it-header'
import ItLine from '../asset/it/it-line'
import AutoNationCard from '../asset/automation/automation-card'
import AutoNationHeader from '../asset/automation/automation-header'
import AutoNationLine from '../asset/automation/automation-line'
import CsdCard from '../asset/csd/csd-card'
import CsdHeader from '../asset/csd/csd-header'
import CsdLine from '../asset/csd/csd-line'
import ErpCard from '../asset/erp/erp-card'
import ErpHeader from '../asset/erp/erp-header'
import ErpLine from '../asset/erp/erp-line'
import PurchaseCard from '../asset/purchase/purchase-card'
import PurchaseHeader from '../asset/purchase/purchase-header'
import PurchaseLine from '../asset/purchase/purchase-line'
import SalesMarketingCard from '../asset/sales-marketing/sales-marketing-card'
import SalesMarketingHeader from '../asset/sales-marketing/sales-marketing-header'
import SalesMarketingLine from '../asset/sales-marketing/sales-marketing-line'
import ListIcon from '../asset/list-icon';

const cardType = {
  admin: {
    Card: AdminCard,
    Header: AdminHeader,
    Line: AdminLine,
  },
  hr: {
    Card: HrCard,
    Header: HrHeader,
    Line: HrLine,
  },
  it: {
    Card: ItCard,
    Header: ItHeader,
    Line: ItLine,
  },
  automation: {
    Card: AutoNationCard,
    Header: AutoNationHeader,
    Line: AutoNationLine,
  },
  csd: {
    Card: CsdCard,
    Header: CsdHeader,
    Line: CsdLine,
  },
  erp: {
    Card: ErpCard,
    Header: ErpHeader,
    Line: ErpLine,
  },
  purchase: {
    Card: PurchaseCard,
    Header: PurchaseHeader,
    Line: PurchaseLine,
  },
  salesmarketing: {
    Card: SalesMarketingCard,
    Header: SalesMarketingHeader,
    Line: SalesMarketingLine,
  },
}
const iconColor = {
  admin: "#4CAF50",
  hr: "#FF5722",
  it: "#447AE1",
  automation: "#607D8B",
  csd: "#FF9800",
  erp: "#9C27B0",
  purchase: '#8BC34A',
  salesmarketing: "#FFC107",
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

const DepartmentModel = ({ content }) => {
  console.log("content", content)
  const [departmentKey, setDepartmentKey] = useState('hr')

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: "easeIn" }
    }
  };


  return (
 <>
        <div className="radial-blur-overlay" />
        <div className="radial-blur-overlay-bottom-left" />
        <div className="radial-blur-overlay-right-center" />
        <div className="gradient-border-card m-8">
          <motion.div className="card-content" variants={contentVariants}>

            <DepartmentCard cardType={cardType} departmentKey={departmentKey} />
            <div className='p-[10%] flex' style={{ color: "white", width: "100%" }}>
              <div style={{ width: "10%", paddingTop: "15px" }}>
                <ListIcon color={iconColor[departmentKey]} />

              </div>
              <div className='pl-5' style={{ width: "90%" }}>
                <div className="flex flex-col space-y-8">
                  {data.department.map((item, index) => (
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
                      <p className='custom-text'>{item.text}</p>
                    </motion.div>
                  ))}
                </div>

              </div>
            </div>
          </motion.div>
        </div>
    </>
  );
};

export default DepartmentModel;
