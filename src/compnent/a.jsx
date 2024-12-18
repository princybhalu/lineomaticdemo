import { useEffect, useRef, useState } from "react";

export default function ProfileCard() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [userData , setUserData] = useState({
    name: "",
    designation: "",
    description: ""

  })

  useEffect(() => {
    // Access the user's camera when the component mounts
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((error) => {
        console.error("Error accessing camera:", error);
      });
  }, []);

  useEffect(() => {
    const sendFrameToBackend = async () => {
      if (videoRef.current && canvasRef.current) {
        const context = canvasRef.current.getContext("2d");

        // Set canvas dimensions to match the video
        canvasRef.current.width = videoRef.current.videoWidth || 640;
        canvasRef.current.height = videoRef.current.videoHeight || 480;

        // Draw the current video frame onto the canvas
        context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);

        // Convert the canvas to a Blob (image data)
        canvasRef.current.toBlob(async (blob) => {
          if (blob) {
            // Create a FormData object
            const formData = new FormData();
            formData.append("file", blob, "frame.jpg");

            try {
              // Send the frame data to the backend
              const response = await fetch("http://localhost:8000/face_recognize", {
                method: "POST",
                body: formData
              });
              console.log("Frame sent:", );
              let da = await response.json()
              if(da.data){
                setUserData(da.data);
              }
            } catch (error) {
              console.error("Error sending frame:", error);
            }
          }
        }, "image/jpeg");
      }
    };

    // Capture a frame and send it to the backend every second
    const interval = setInterval(sendFrameToBackend, 1000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return (
    <div className="flex gap-6 items-start">
      {/* Camera Feed */}
      <div className="w-32 h-32 flex-shrink-0 overflow-hidden bg-black rounded-full">
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          className="w-full h-full object-cover"
        ></video>
        {/* Hidden Canvas to Capture Frames */}
        <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
      </div>

      {/* Content */}
      <div className="flex-1">
        <h3 className="text-teal-400 text-2xl font-semibold mb-1">{userData.name}</h3>
        <p className="text-teal-200 text-sm mb-4">{userData.designation}</p>
        <p className="text-gray-300 leading-relaxed">{userData.description}</p>
      </div>
    </div>
  );
}
