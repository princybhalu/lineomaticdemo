'use client';

import React, { useEffect, useRef, useState } from 'react';

export default function CameraView({}) {
  const videoRef = useRef(null);
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://api.example.com/data');
        const data = await response.json();
        setApiData(data);
      } catch (error) {
        console.error('Error fetching API data:', error.message, error);
      }
    };

    const intervalId = setInterval(fetchData, 1000);

    return () => clearInterval(intervalId);
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
      {/* {apiData && (
        <div className="absolute top-0 left-0 bg-black bg-opacity-50 text-white p-2">
          API Data: {JSON.stringify(apiData)}
        </div>
      )} */}
    </div>
  );
}
