// import React, { useState, useRef } from "react";
// import io from "socket.io-client";

// const App = () => {
//   const [isRecording, setIsRecording] = useState(false);
//   const [transcription, setTranscription] = useState("");
//   const mediaRecorderRef = useRef(null);
//   const socketRef = useRef(null);
//   const audioContextRef = useRef(null);
//   const analyserRef = useRef(null);
//   const dataArrayRef = useRef(null);
//   const threshold = 5; 

//   const checkAudioLevel = () => {
//     analyserRef.current.getByteFrequencyData(dataArrayRef.current);
//     const volume = dataArrayRef.current.reduce((sum, value) => sum + value, 0) / dataArrayRef.current.length;
//     return {
//       result: volume > threshold,
//       volume,
//     };
//   };

//   const handleStartRecording = async () => {
//     let dbs = [];

//     const s = setInterval(() => {
//       if (socketRef.current) {
//         const data = checkAudioLevel();
//         dbs.push(data.volume);
//       }
//     }, 100)
    
//     const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//     audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
//     const source = audioContextRef.current.createMediaStreamSource(stream);

//     analyserRef.current = audioContextRef.current.createAnalyser();
//     analyserRef.current.fftSize = 256;
//     const bufferLength = analyserRef.current.frequencyBinCount;
//     dataArrayRef.current = new Uint8Array(bufferLength);

//     source.connect(analyserRef.current);

//     socketRef.current = io("http://localhost:5000");

//     const mediaRecorder = new MediaRecorder(stream);
//     mediaRecorderRef.current = mediaRecorder;

//     mediaRecorder.ondataavailable = (event) => {
//       const avg = dbs.reduce((p, c) => p + c, 0) / dbs.length;
//       console.log(avg);

//       if (avg > threshold && event.data.size > 0 && socketRef.current) {
//         socketRef.current.emit("audio-chunk", event.data);
//       }
//       dbs = [];
//     };

//     mediaRecorder.onstop = () => {
//       clearInterval(s);
//       if (socketRef.current) {
//         socketRef.current.emit("end");
//         socketRef.current.disconnect();
//       }
//     };

//     mediaRecorder.start(2000);
//     setIsRecording(true);

//     socketRef.current.on("transcription", (text) => {
//       setTranscription((prev) => prev + text);
//     });
//   };

//   const handleStopRecording = () => {
//     mediaRecorderRef.current.stop();
//     setIsRecording(false);
//   };

//   return (
//     <div style={{ textAlign: "center", marginTop: "50px" }}>
//       <h1>Real-Time Voice Transcription</h1>
//       <button onClick={isRecording ? handleStopRecording : handleStartRecording}>
//         {isRecording ? "Stop Recording" : "Start Recording"}
//       </button>
//       <h3>Transcription:</h3>
//       <p>{transcription}</p>
//     </div>
//   );
// };

// export default App;