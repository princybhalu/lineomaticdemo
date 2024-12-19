// import { useEffect, useRef, useState } from "react";

// export default function ProfileCard({setted}) {
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);
//   const [userData , setUserData] = useState({
//     name: "",
//     designation: "",
//     description: ""

//   })

//   useEffect(() => {
//     // Access the user's camera when the component mounts
//     navigator.mediaDevices
//       .getUserMedia({ video: true })
//       .then((stream) => {
//         if (videoRef.current) {
//           videoRef.current.srcObject = stream;
//         }
//       })
//       .catch((error) => {
//         console.error("Error accessing camera:", error);
//       });
//   }, []);

//   useEffect(() => {
//     const sendFrameToBackend = async () => {
//       if (videoRef.current && canvasRef.current) {
//         const context = canvasRef.current.getContext("2d");

//         // Set canvas dimensions to match the video
//         canvasRef.current.width = videoRef.current.videoWidth || 640;
//         canvasRef.current.height = videoRef.current.videoHeight || 480;

//         // Draw the current video frame onto the canvas
//         context.drawImage(videoRef.current, 0, 0, canvasRef.current.width, canvasRef.current.height);

//         // Convert the canvas to a Blob (image data)
//         canvasRef.current.toBlob(async (blob) => {
//           if (blob) {
//             // Create a FormData object
//             const formData = new FormData();
//             formData.append("file", blob, "frame.jpg");

//             try {
//               // Send the frame data to the backend
//               const response = await fetch("http://localhost:8000/face_recognize", {
//                 method: "POST",
//                 body: formData
//               });
//               console.log("Frame sent:", );
//               let da = await response.json()
//               if(da.data){
//                 setUserData(da.data);
//                 setted(true);
//               }
//             } catch (error) {
//               console.error("Error sending frame:", error);
//             }
//           }
//         }, "image/jpeg");
//       }
//     };

//     // Capture a frame and send it to the backend every second
//     const interval = setInterval(sendFrameToBackend, 1000);

//     return () => clearInterval(interval); // Cleanup on unmount
//   }, []);

//   return (
//     // <div className="flex flex-col w-full h-1/2 mx-auto justify-center items-center">
// <>
//       <div className="w-full h-1/2 mx-auto flex overflow-hidden bg-black">
//         <video
//           ref={videoRef}
//           autoPlay
//           muted
//           playsInline
//           className="w-full h-full object-cover"
//         ></video>
//         {/* Hidden Canvas to Capture Frames */}
//         <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
//       </div>

//       {/* Content */}
//       <div className="flex-1">
//         <h3 className="text-teal-400 text-2xl font-semibold mb-1">{userData.name}</h3>
//         <p className="text-teal-200 text-sm mb-4">{userData.designation}</p>
//         <p className="text-gray-300 leading-relaxed">{userData.description}</p>
//       </div>
//       </>
//     // </div>
//   );
// }

import { useEffect, useRef, useState } from "react";

export default function ProfileCard({ setted }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [userData, setUserData] = useState({
    name: "",
    designation: "",
    description: ""
  });

  useEffect(() => {
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
              setted(true); // Set IsSet to true when data is received
            }else {
              setted(false);
              setUserData({
                name: "",
                designation: "",
                description: ""
              });
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

    // const interval = setInterval(sendFrameToBackend, 1000);
    // return () => clearInterval(interval);
  }, [setted]);

  return (
    // <div className="w-full h-full flex flex-col items-center justify-center bg-gray-800 rounded-lg shadow-lg p-4">
    //   <div className="relative w-full h-3/4 overflow-hidden bg-black rounded-lg mb-4">
    //     <video
    //       ref={videoRef}
    //       autoPlay
    //       muted
    //       playsInline
    //       className="w-full h-full object-cover"
    //     ></video>
    //     <canvas ref={canvasRef} className="hidden"></canvas>
    //   </div>
    //   <div className="w-full h-1/4 text-center">
    //     <h3 className="text-teal-400 text-xl font-semibold mb-1">{userData.name || "Scanning..."}</h3>
    //     <p className="text-teal-200 text-sm mb-2">{userData.designation}</p>
    //     <p className="text-gray-300 text-sm leading-relaxed line-clamp-2">{userData.description}</p>
    //   </div>
    // </div>
   
     <div className="flex w-full h-1/2 mx-auto justify-center items-center">
      <div className="w-full h-1/2 mx-auto flex overflow-hidden bg-black">
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
      {
        userData.name && <>
        <div className="flex-1 ml-4 w-full">
        <h3 className="text-teal-400 text-2xl font-semibold mb-1">{userData.name}</h3>
        <p className="text-teal-200 text-sm mb-4">{userData.designation}</p>
        <p className="text-gray-300 leading-relaxed">{userData.description}</p>
      </div>
        </>
      }   
    </div>

  );
}



