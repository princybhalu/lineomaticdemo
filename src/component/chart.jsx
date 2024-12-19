'use client'

// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

// const data = [
//   {
//     month: 'Aug',
//     'VENDOR 1': 4,
//     'VENDOR 2': 3,
//     'VENDOR 3': 2,
//   },
//   {
//     month: 'Sep',
//     'VENDOR 1': 4,
//     'VENDOR 2': 1,
//     'VENDOR 3': 2,
//   },
//   {
//     month: 'Oct',
//     'VENDOR 1': 4,
//     'VENDOR 2': 2.5,
//     'VENDOR 3': 2,
//   },
// ]

// export default function VendorComparison() {
//   return (
//     <div className="w-full h-[250px] p-2 rounded-lg">
//       <ResponsiveContainer width="100%" height="100%">
//         <BarChart
//           data={data}
//           margin={{
//             top: 20,
//             right: 30,
//             left: 20,
//             bottom: 5,
//           }}
//         >
//           <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
//           <XAxis 
//             dataKey="month" 
//             axisLine={{ stroke: '#333' }}
//             tick={{ fill: '#fff' }}
//           />
//           <YAxis 
//             axisLine={{ stroke: '#333' }}
//             tick={{ fill: '#fff' }}
//             domain={[0, 5]}
//             ticks={[0, 1, 2, 3, 4, 5]}
//           />
//           <Tooltip
//             contentStyle={{
//               backgroundColor: '#333',
//               border: 'none',
//               borderRadius: '4px',
//               color: '#fff',
//             }}
//           />
//           <Legend 
//             verticalAlign="top" 
//             height={36}
//             wrapperStyle={{
//               color: '#fff',
//             }}
//           />
//           <Bar 
//             dataKey="VENDOR 1" 
//             fill="#33d657" 
//             radius={[4, 4, 0, 0]}
//           />
//           <Bar 
//             dataKey="VENDOR 2" 
//             fill="#4cc9f0" 
//             radius={[4, 4, 0, 0]}
//           />
//           <Bar 
//             dataKey="VENDOR 3" 
//             fill="#ff4d4d" 
//             radius={[4, 4, 0, 0]}
//           />
//         </BarChart>
//       </ResponsiveContainer>
//     </div>
//   )
// }

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer } from 'recharts';

const visitorData = [
  { name: 'Joe Smith', Admitted: 2, Rejected: 0 },
  { name: 'Jane Doe', Admitted: 0, Rejected: 1 },
  { name: 'HOD', Admitted: 1, Rejected: 0 },
];

const VisitorChart = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={visitorData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="Admitted" fill="#82ca9d" />
        <Bar dataKey="Rejected" fill="#ff7373" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default VisitorChart;

