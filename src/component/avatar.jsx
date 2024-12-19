import { ElevenLabsClient } from "elevenlabs";
import React, { useRef, useMemo, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import * as sdk from "microsoft-cognitiveservices-speech-sdk";
import { io } from "socket.io-client";
import { useConversation } from "@11labs/react"

function ParticleSystem({isSet}) {
  const pointsRef = useRef(null)
  const audioContextRef = useRef(null)
  const analyserRef = useRef(null)
  const [audioData, setAudioData] = useState(new Uint8Array(128))
  const originalPositions = useRef(null)
  const [isRecording, setIsRecording] = useState(false);
  const [transcription, setTranscription] = useState("");
  const [error, setError] = useState("");
  const recognizerRef = useRef(null);
  const socketRef = useRef(null);
  const sourceRef = useRef(null);
  const conversation = useConversation();

  const startContinuousSpeechToText = () => {
    const speechKey = "Fr8S3gxJZrMUrUoeMUr9pHEQWsEIDzsi7nmzitwc7dwAYnF4VbfMJQQJ99ALACYeBjFXJ3w3AAAAACOGRnTN";
    const serviceRegion = "eastus";

    if (!speechKey || !serviceRegion) {
      setError("Please provide a valid Azure Speech key and region.");
      return;
    }

    setError("");
    setIsRecording(true);

    const speechConfig = sdk.SpeechConfig.fromSubscription(speechKey, serviceRegion);
    speechConfig.speechRecognitionLanguage = "hi-IN";

    const audioConfig = sdk.AudioConfig.fromDefaultMicrophoneInput();

    const recognizer = new sdk.SpeechRecognizer(speechConfig, audioConfig);
    recognizerRef.current = recognizer;

    console.log(recognizer);

    recognizer.recognizing = (sender, event) => {
      if (sourceRef.current) {
        sourceRef.current.stop();
        sourceRef.current = null;
      }
      setTranscription((prev) => event.result.text);
      console.log("rezing", event.result.text);
    };

    recognizer.recognized = (sender, event) => {
      if (event.result.reason === sdk.ResultReason.RecognizedSpeech) {
        setTranscription((prev) => event.result.text);
        console.log(event.result.text);
        socketRef.current.emit("query", event.result.text);
      } else if (event.result.reason === sdk.ResultReason.NoMatch) {
        console.log("No speech recognized.");
      }
    };

    socketRef.current.on("ai", async (data) => {
      console.log(data);
      const client = new ElevenLabsClient({ apiKey: "sk_0f2e4e194c7f474e82913629c0871f58895d3409239ae7e4" });
      const audioData = await client.textToSpeech.convert("FmBhnvP58BK0vz65OOj7", {
        output_format: "mp3_44100_128",
        text: data,
        model_id: "eleven_multilingual_v2"
      });
      const chunks = [];
      for await (const chunk of audioData) {
        chunks.push(chunk);
      }
      const audioBlob = new Blob(chunks, { type: 'audio/mp3' });

      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const audioBuffer = await audioContext.decodeAudioData(await audioBlob.arrayBuffer());
        const s1 = audioContext.createBufferSource();
        sourceRef.current = s1;
        s1.buffer = audioBuffer;
        s1.connect(audioContext.destination);

        if (recognizerRef.current) {
          console.log("Stopping recognition as audio is playing...");
          // recognizerRef.current.stopContinuousRecognitionAsync();
        }

        s1.onended = () => {
          if (recognizerRef.current && !isRecording) {
            console.log("Audio playback finished, resuming recognition...");
            // recognizerRef.current.startContinuousRecognitionAsync();
          }
        };

        s1.start(0);
    });

    recognizer.canceled = (sender, event) => {
      setError(`Speech recognition canceled: ${event.errorDetails}`);
      stopRecording();
    };

    recognizer.sessionStopped = () => {
      console.log("Session stopped.");
      stopRecording();
    };

  };

  const stopRecording = () => {
    setIsRecording(false);

    if (recognizerRef.current) {
      recognizerRef.current.stopContinuousRecognitionAsync(() => {
        recognizerRef.current.close();
        recognizerRef.current = null;
      });
    }
  };
  
  useEffect(() => {
    console.log(isSet , ":  isSets" )
    if (isSet && recognizerRef.current){
      recognizerRef.current.startContinuousRecognitionAsync();
    } else if (!isSet && recognizerRef.current) {
      recognizerRef.current.stopContinuousRecognitionAsync(() => {
        recognizerRef.current.close();
        recognizerRef.current = null;
      });
    }
  },[isSet])

  useEffect(() => {
    const socket = io("http://localhost:5000");
    socketRef.current = socket;

    if (!recognizerRef.current) {
      startContinuousSpeechToText();
    }

    socket.on("connect", () => {
      console.log("Connected to server");
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from server");
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  // useEffect(() => {
  //   let speechDetectionTimeout;

  //   const detectSpeech = async () => {
  //     try {
  //       const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  //       const audioContext = new AudioContext();
  //       const analyser = audioContext.createAnalyser();
  //       const microphone = audioContext.createMediaStreamSource(stream);
  //       microphone.connect(analyser);

  //       analyser.fftSize = 2048;
  //       const bufferLength = analyser.frequencyBinCount;
  //       const dataArray = new Uint8Array(bufferLength);

  //       const checkAudioLevel = () => {
  //         let dbs = [];
  //         analyser.getByteFrequencyData(dataArray);
  //         const averageVolume = dataArray.reduce((sum, value) => sum + value, 0) / bufferLength;
  //         console.log(dbs.length, averageVolume, sourceRef.current);

  //         if (averageVolume > 11 && sourceRef.current) {
  //           // sourceRef.current.stop();
  //         }
  //       };

  //       setInterval(checkAudioLevel, 1000);
  //     } catch (error) {
  //       console.error('Error in speech detection:', error);
  //     }
  //   };

  //   detectSpeech();

  //   return () => {
  //     clearTimeout(speechDetectionTimeout);
  //   };
  // }, []);

  const particles = useMemo(() => {
    const particleCount = 8000
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)
    const movementTypes = new Float32Array(particleCount)

    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.random() * Math.PI
      const r = 0.8 + Math.random() * 0.2

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.cos(phi)
      positions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta)

      // Set color to RGB(2, 160, 224)
      colors[i * 3] = 2 / 255 // Red
      colors[i * 3 + 1] = 160 / 255 // Green
      colors[i * 3 + 2] = 224 / 255 // Blue

      // Randomly assign movement type (40% particles will move)
      movementTypes[i] = Math.random() < 0.4 ? 1 : 0
    }

    originalPositions.current = positions.slice()
    return { positions, colors, particleCount, movementTypes }
  }, [])


  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then(stream => {
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)()
        const source = audioContextRef.current.createMediaStreamSource(stream)
        analyserRef.current = audioContextRef.current.createAnalyser()
        analyserRef.current.fftSize = 256
        source.connect(analyserRef.current)
      })
      .catch(err => console.error("Error accessing microphone:", err))

    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close()
      }
    }
  }, [])

  useFrame((state) => {
    if (!pointsRef.current || !analyserRef.current) return

    const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount)
    analyserRef.current.getByteFrequencyData(dataArray)
    setAudioData(dataArray)

    const average = dataArray.reduce((a, b) => a + b, 0) / dataArray.length
    const normalizedVolume = average / 255

    const positions = pointsRef.current.geometry.attributes.position.array
    for (let i = 0; i < particles.particleCount; i++) {
      const originalX = originalPositions.current[i * 3]
      const originalY = originalPositions.current[i * 3 + 1]
      const originalZ = originalPositions.current[i * 3 + 2]

      if (particles.movementTypes[i] === 1) {
        // Moving particles: Apply directional movement based on audio
        const movement = Math.sin(state.clock.elapsedTime * 2 + i) * normalizedVolume * 0.5
        positions[i * 3] = originalX * (1 + normalizedVolume * 0.3)
        positions[i * 3 + 1] = originalY + movement // Add vertical movement
        positions[i * 3 + 2] = originalZ * (1 + normalizedVolume * 0.3)
      } else {
        // Stable particles: Slight pulsing effect only
        const scale = 1 + normalizedVolume * 0.1
        positions[i * 3] = originalX * scale
        positions[i * 3 + 1] = originalY * scale
        positions[i * 3 + 2] = originalZ * scale
      }
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true
    pointsRef.current.rotation.y = state.clock.elapsedTime * 0.05
    pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particles.particleCount}
          array={particles.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={particles.particleCount}
          array={particles.colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        vertexColors
        size={0.015}
        sizeAttenuation={true}
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}

export default function AudioReactiveParticles({isSet}) {
  return (
    <Canvas camera={{ position: [0, 0, 2] }}>
      <ambientLight intensity={0.5} />
      <ParticleSystem isSet={isSet} />
    </Canvas>
  )
}

