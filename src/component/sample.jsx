import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const VisitorManagementChart = () => {
  // Sample visitor data
  const visitorData = [
    { name: 'Joe Smith', Admitted: 2, Rejected: 0 },
    { name: 'Jane Doe', Admitted: 0, Rejected: 1 },
    { name: 'HOD', Admitted: 1, Rejected: 0 },
  ];

  // Data for the chart
  const chartData = {
    labels: visitorData.map((visitor) => visitor.name),
    datasets: [
      {
        label: 'Admitted',
        data: visitorData.map((visitor) => visitor.Admitted),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Rejected',
        data: visitorData.map((visitor) => visitor.Rejected),
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      {/* <h1>Visitor Management System Overview</h1> */}

      <p>
        The Visitor Management System (VMS) is designed to capture visitor details and ensure
        smooth entry for employees' guests. When a visitor arrives, their data is recorded, and
        an OTP is sent to the concerned employee. However, the current system faces challenges
        such as manual errors in data entry and the lack of a visitor history database.
      </p>

      <h2>Key Challenges</h2>
      <ul>
        <li>
          <strong>Manual Errors:</strong> Guards may mistakenly send OTPs to the wrong employee.
        </li>
        <li>
          <strong>Repetitive Data Entry:</strong> Frequent visitors must re-enter data on every
          visit due to the lack of a database.
        </li>
        <li>
          <strong>No Prioritization:</strong> Important visitors cannot be treated differently
          from regular visitors without manual intervention.
        </li>
      </ul>

      <h2>Visitor Data Chart</h2>
      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        <Bar data={chartData} options={chartOptions} />
      </div>

      <h2>Summary</h2>
      <p>
        The chart illustrates the number of admitted and rejected visitors for different staff
        members. This data highlights the need for better error handling and optimization in the
        VMS to ensure accuracy and prioritize important visitors effectively.
      </p>
    </div>
  );
};

export default VisitorManagementChart;
