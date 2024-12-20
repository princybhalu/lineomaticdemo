import React, { useRef, useMemo, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function ParticleSystem({ isListening }) {
  const pointsRef = useRef(null)
  
  const particles = useMemo(() => {
    const particleCount = 8000
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)

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
    }

    return { positions, colors, particleCount }
  }, [])

  useFrame(({ clock }) => {
    if (pointsRef.current) {
      // Always rotate
      pointsRef.current.rotation.y = clock.getElapsedTime() * 0.05

      if (isListening) {
        // Add fluctuation effect when listening
        const positions = pointsRef.current.geometry.attributes.position.array
        for (let i = 0; i < particles.particleCount; i++) {
          const i3 = i * 3
          positions[i3 + 1] += Math.sin(clock.getElapsedTime() * 5 + i * 0.1) * 0.005
        }
        pointsRef.current.geometry.attributes.position.needsUpdate = true
      }
    }
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

export default function ParticleAvatar() {
  const [isListening, setIsListening] = useState(false)

  useEffect(() => {
    let audioContext = null
    let analyser = null
    let dataArray = null
    let animationFrameId = null

    const checkMicrophonePermission = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
        setIsListening(true)

        audioContext = new (window.AudioContext || window.webkitAudioContext)()
        const source = audioContext.createMediaStreamSource(stream)
        analyser = audioContext.createAnalyser()
        source.connect(analyser)

        analyser.fftSize = 256
        const bufferLength = analyser.frequencyBinCount
        dataArray = new Uint8Array(bufferLength)

        const updateAudio = () => {
          if (analyser && dataArray) {
            analyser.getByteFrequencyData(dataArray)
            // You can use dataArray here to visualize audio data if needed
          }
          animationFrameId = requestAnimationFrame(updateAudio)
        }
        updateAudio()
      } catch (error) {
        console.error('Microphone permission not granted:', error)
        setIsListening(false)
      }
    }

    checkMicrophonePermission()

    return () => {
      if (audioContext) {
        audioContext.close()
      }
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [])

  return (
    <div className="h-screen w-full bg-gray-950">
      <Canvas camera={{ position: [0, 0, 2] }}>
        <ambientLight intensity={0.5} />
        <ParticleSystem isListening={isListening} />
      </Canvas>
    </div>
  )
}
