import React, { useRef, useMemo, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function ParticleSystem() {
  const pointsRef = useRef(null)
  const audioContextRef = useRef(null)
  const analyserRef = useRef(null)
  const [audioData, setAudioData] = useState(new Uint8Array(128))
  const originalPositions = useRef(null)
  
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

export default function AudioReactiveParticles() {
  return (
      <Canvas camera={{ position: [0, 0, 2] }}>
        <ambientLight intensity={0.5} />
        <ParticleSystem />
      </Canvas>
  )
}

