import React, { useState, useEffect, useRef , useContext } from "react";
import { STATEOFSPEAK } from "../utills/constant";
import {ThemeContext} from "../pages/landing4";

let LocalRes = [];
let lastText = "";
let countOfSocket = 0 ;
let rejectMode = false;

const WebSocketComponent = ({
  text: propText,
  setCurrentStateOfSpeech,
  callBackOfSpeak,
  currentCategoryOfSpeech,
}) => {
  const [socket, setSocket] = useState(null); // WebSocket instance
  const [responses, setResponses] = useState([]); // Store received audio chunks
  const [isConnected, setIsConnected] = useState(false); // WebSocket connection status
  const audioRef = useRef(null); // Ref to the audio element

  const { stopAudio } = useContext(ThemeContext);

  useEffect(() => {
    const ws = new WebSocket("ws://192.168.178.49:42069/ws/synthesize-chunks");

    ws.onopen = () => {
      console.log("WebSocket connected");
      setIsConnected(true);
    };

    ws.onmessage = (event) => {
      const data = event.data;
      if (typeof data !== "string") {
        console.log("Received audio chunk: ", data);
        if(!rejectMode ) setResponses((prev) => [...prev, data]);
        LocalRes.push(data);
      }else if(typeof data === "string"){
        countOfSocket --;
        if(countOfSocket < 1) rejectMode = false;
      }
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    ws.onclose = () => {
      console.log("WebSocket disconnected");
      setIsConnected(false);
    };

    setSocket(ws);

    return () => {
      ws.close();
    };
  }, []);

  useEffect(() => {
    if (socket && isConnected && propText && propText !== lastText) {
      const payload = { text: propText };
      socket.send(JSON.stringify(payload));
      console.log("Message sent:", payload);
      lastText = propText;
      countOfSocket++;
    }
  }, [propText, socket, isConnected]);

  useEffect(() => {
    if (responses.length > 0 && audioRef.current && audioRef.current.paused) {
      const [nextChunk, ...remainingChunks] = LocalRes;
      const audioBlob = new Blob([nextChunk], { type: "audio/wav" });
      const audioURL = URL.createObjectURL(audioBlob);
      audioRef.current.src = audioURL;
      audioRef.current.play();

      audioRef.current.onended = () => {
        URL.revokeObjectURL(audioURL);
        LocalRes.shift();
        setResponses(LocalRes);

        if (LocalRes.length === 0) {
          setCurrentStateOfSpeech(STATEOFSPEAK.NORMAL);
          if (callBackOfSpeak) {
            callBackOfSpeak(currentCategoryOfSpeech);
          }
        }
      };
    }
  }, [responses]);

  useEffect(() => {
    // Stop and reset when stopAudio changes
    if (stopAudio) {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = ""; // Clear audio source
      }
      console.log("stop audio");
      rejectMode = true;
      LocalRes = [];
      setResponses([]);
      setCurrentStateOfSpeech(STATEOFSPEAK.NORMAL);
      console.log("Audio stopped and parameters reset");
    }
  }, [stopAudio]);

  return <audio ref={audioRef} style={{ display: "none" }} />;
};

export default WebSocketComponent;
