'use client';

import React, { useEffect, useRef, useState } from 'react';

export default function CameraView({userData , setUserData , setIsCameraOpen}) {
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
      const context = canvasRef.current.getContext("2d");
      if (!context) return;

      canvasRef.current.width = videoRef.current.videoWidth || 640;
      canvasRef.current.height = videoRef.current.videoHeight || 480;

      context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);

      canvasRef.current.toBlob(async (blob) => {
        if (blob) {
          const formData = new FormData();
          formData.append("file", blob, "frame.jpg");
          formData.append("accurate", true)

          try {
            const response = await fetch("http://localhost:8000/face_recognize", {
              method: "POST",
              body: formData
            });
            const data = await response.json();
            if (data.data) {
              setUserData(data.data);
            }else {
              setUserData(null);
              await sendFrameToBackend();
            }

          } catch (error) {
            console.error("Error sending frame:", error);
            await sendFrameToBackend();
          }
        }
      }, "image/jpeg");
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
    <div className="relative w-full h-full">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="w-full h-full object-cover rounded-2xl"
      />
      {/* Hidden Canvas to Capture Frames */}
      <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
      {/* {apiData && (
        <div className="absolute top-0 left-0 bg-black bg-opacity-50 text-white p-2">
          API Data: {JSON.stringify(apiData)}
        </div>
      )} */}
    </div>
  );
}
