'use client';

import React, { useEffect, useRef, useState } from 'react';

export default function CameraView({ userData, setUserData, setIsCameraOpen }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [hasPermission, setHasPermission] = useState(true);
  const [apiData, setApiData] = useState(null);

  console.log(hasPermission, 'hasPermission');

  useEffect(() => {
    let isMounted = true;

    async function setupCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
        });
        console.log('Stream:', stream); // Debugging purpose
        if (isMounted && videoRef.current) {
          videoRef.current.srcObject = stream;
          setHasPermission(true);
        }
      } catch (err) {
        console.error('Error accessing camera:', err.message, err);
        if (isMounted) setHasPermission(false);
      }
    }

    setupCamera();

    return () => {
      isMounted = false; // Prevent updates if component unmounts
    };
  }, [hasPermission]);

  const sendFrameToBackend = async () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      if (!context) return;

      canvasRef.current.width = videoRef.current.videoWidth || 640;
      canvasRef.current.height = videoRef.current.videoHeight || 480;

      context.drawImage(
        videoRef.current,
        0,
        0,
        canvasRef.current.width,
        canvasRef.current.height
      );

      canvasRef.current.toBlob(async (blob) => {
        if (blob) {
          const formData = new FormData();
          formData.append('file', blob, 'frame.jpg');
          formData.append('accurate', true);

          try {
            const response = await fetch(
              'http://localhost:8000/face_recognize',
              {
                method: 'POST',
                body: formData,
              }
            );
            const data = await response.json();
            if (data.data) {
              setUserData(data.data);
            } else {
              setUserData(null);
              await sendFrameToBackend();
            }
          } catch (error) {
            console.error('Error sending frame:', error);
            await sendFrameToBackend();
          }
        }
      }, 'image/jpeg');
    }
  };

  useEffect(() => {
    sendFrameToBackend();
  }, []);

  if (hasPermission === null) {
    return <div>Requesting camera permission...</div>;
  }

  if (hasPermission === false) {
    return (
      <div>
        Camera permission denied. Please enable camera access and refresh the
        page.
      </div>
    );
  }

  return (
    <>
      {/* <div className="p-5 h-full w-full relative"> */}
      <div className="p-4 h-full w-full relative">
        <div className="relative w-full h-full">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            muted
            className="w-full h-full object-cover rounded-2xl"
          />
          {/* Hidden Canvas to Capture Frames */}
          <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
          {/* {apiData && (
        <div className="absolute top-0 left-0 bg-black bg-opacity-50 text-white p-2">
          API Data: {JSON.stringify(apiData)}
        </div>
      )} */}
        </div>
        {userData !== null && (
          <>
            {/* <div className="w-full bg-gray-50 "> */}
            {/* <div className="absolute right-40 top-[150px]"> */}
            <div
              className="absolute top-[20%] w-[50%] right-[-15%]"
              style={{ transform: ' translateY(-20%)' }}
            >
              {/* Base line */}
              {/* <div
                                    className="absolute h-[2px] w-[190px] bg-white origin-left drop-shadow-2xl"
                                    style={{
                                      animation: 'drawLine 1s linear forwards',
                                    }}
                                  /> */}

              <div
                className="absolute h-[2px] w-[100%] bg-white origin-left drop-shadow-2xl"
                style={{
                  animation: 'drawLine 1s linear forwards',
                }}
              />

              {/* Rotated line */}
              <div className="absolute h-[2px] w-[65px] bg-white origin-left rotate-[120deg] drop-shadow-2xl animate-draw-line-delayed" />

              {/* Circle group */}
              <div
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{
                  top: `calc(65px * sin(120deg))`,
                  left: `calc(65px * cos(120deg))`,
                  animation: 'fadeInCircle 1s linear 0.5s forwards',
                }}
              >
                {/* Outer glow */}
                <div className="absolute w-16 h-16 bg-blue-400/20 rounded-full -translate-x-1/2 -translate-y-1/2 blur-xl" />
                {/* Middle glow */}
                <div className="absolute w-12 h-12 bg-blue-500/30 rounded-full -translate-x-1/2 -translate-y-1/2 blur-lg" />
                {/* Inner circle */}
                <div className="absolute w-8 h-8 bg-blue-700 rounded-full -translate-x-1/2 -translate-y-1/2" />
                {/* Center dot */}
                <div className="absolute w-[1.2rem] h-[1.2rem] bg-blue-400 rounded-full -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute w-2 h-2  bg-blue-700 rounded-full -translate-x-1/2 -translate-y-1/2" />
              </div>
              {/* </div> */}
              {/* Add Keyframe Animations */}
              <style jsx>{`
                @keyframes drawLine {
                  0% {
                    transform: scaleX(0);
                    opacity: 0;
                  }
                  100% {
                    transform: scaleX(1);
                    opacity: 1;
                  }
                }

                @keyframes drawLineAndStay {
                  0% {
                    transform: scaleX(0) rotate(120deg);
                    opacity: 0;
                  }
                  100% {
                    transform: scaleX(1) rotate(120deg);
                    opacity: 1;
                  }
                }

                @keyframes fadeInCircle {
                  from {
                    opacity: 0;
                    transform: scale(0.8);
                  }
                  to {
                    opacity: 1;
                    transform: scale(1);
                  }
                }
              `}</style>
            </div>
          </>
        )}
      </div>
    </>
  );
}
