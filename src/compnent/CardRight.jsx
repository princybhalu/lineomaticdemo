import React from 'react';
import '../style/left-card.css';
import { Component, useState, useCallback, useRef } from 'react';

const options = {
  chart: {
    type: 'column',
    backgroundColor: null // Set the background color to transparent
  },
  title: {
    text: 'Column chart'
  },
  xAxis:{
      categories:['Apple','Bananas','Orange']
  },
  yAxis:{
      title:{
        text:'Fruits Eaten'
      }
    },
  series: [
    {
      name:'John',
      data: [1, 2, 3]
    },
    {
      name:'Jane',
      data: [4,5,6]
    },
  ]
};


function CardRight() {

    const chartRef = useRef();
    const onChartReady = useCallback((chart) => chartRef.current = chart);
  
    const toggleChildBars = useCallback(() => {
      if(chartRef.current) {
        const parentSeries = chartRef.current.series[0];
        parentSeries.data[1].update({ color: parentSeries.data[1].color === "lightgrey" ? "red" : "lightgrey"})
        chartRef.current.series.slice(1).forEach(s => {
          s.update({ visible: !s.visible })
        })
      }
    }); 
    return (
      <div className="box p-2">
        <div className="custom-clip-right-left text-white  bg-[#1D3D4C] flex items-center">
          <div
            className={`bg-[#294D5F] h-[70%] linn w-2  ml-1 mr-1
              }`}
          ></div>
           <div
            className={`bg-[#294D5F] h-[70%] linn w-1 mr-5
              }`}
          ></div>
          <h3 className="text-sm font-semibold tracking-wide text-[#00D4FF] uppercase "style={{transform:"rotatey(180deg)"}}>
            TODAY’S EARNING
          </h3>
        </div>
        <div className="p-[15px]">
          <div className="w-[85%] overflow-hidden">
            <div className="inner-box mt-2">
              {/* <div className='border w-[100%] h-12'>
  
              </div> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default CardRight;