'use client'

import React, { useRef, useMemo, useEffect, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { EffectComposer, Bloom } from '@react-three/postprocessing'

const INITIAL_PARTICLE_COUNT = 3000; // 25% of the full particle count
const FULL_PARTICLE_COUNT = 12000;

function ParticleSystem() {
  const pointsRef = useRef(null)
  const audioContextRef = useRef(null)
  const analyserRef = useRef(null)
  const [audioData, setAudioData] = useState(new Uint8Array(128))
  const originalPositions = useRef(null)
  const [isLoading, setIsLoading] = useState(true)
  const loadingProgress = useRef(0)
  const expansionProgress = useRef(0)
  const INITIAL_SCALE = 0.2 // 20% of the original size
  let prevVolume = 0

  const particles = useMemo(() => {
    const particleCount = FULL_PARTICLE_COUNT;
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

    // Simulating loading time (replace with your actual loading logic)
    const loadingTimer = setTimeout(() => {
      setIsLoading(false)
    }, 5000) // 5 seconds loading time

    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close()
      }
      clearTimeout(loadingTimer)
    }
  }, [])

  useFrame((state) => {
    if (!pointsRef.current) return

    const positions = pointsRef.current.geometry.attributes.position.array
    const time = state.clock.getElapsedTime()

    let visibleParticleCount;

    if (isLoading) {
      // Loading animation with heartbeat effect
      loadingProgress.current = Math.min(loadingProgress.current + 0.016, 1) // Assuming 60fps
      
      const heartbeatSpeed = 1.5
      const heartbeatStrength = 0.15
      const heartbeat = Math.sin(time * heartbeatSpeed * Math.PI) * heartbeatStrength
      const currentScale = INITIAL_SCALE * (1 + heartbeat)
      
      visibleParticleCount = INITIAL_PARTICLE_COUNT;

      for (let i = 0; i < visibleParticleCount; i++) {
        const i3 = i * 3
        const originalX = originalPositions.current[i3]
        const originalY = originalPositions.current[i3 + 1]
        const originalZ = originalPositions.current[i3 + 2]

        positions[i3] = originalX * currentScale
        positions[i3 + 1] = originalY * currentScale
        positions[i3 + 2] = originalZ * currentScale
      }

      pointsRef.current.rotation.y = time * 0.2
    } else {
      // Expansion animation when loading is complete
      expansionProgress.current = Math.min(expansionProgress.current + 0.01, 1)
      const currentScale = THREE.MathUtils.lerp(INITIAL_SCALE, 1, expansionProgress.current)

      visibleParticleCount = Math.floor(THREE.MathUtils.lerp(INITIAL_PARTICLE_COUNT, FULL_PARTICLE_COUNT, expansionProgress.current));

      if (analyserRef.current) {
        // Audio-reactive animation
        const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount)
        analyserRef.current.getByteFrequencyData(dataArray)
        setAudioData(dataArray)

        const average = dataArray.reduce((a, b) => a + b, 0) / dataArray.length
        const normalizedVolume = average / 255

        const smoothingFactor = 0.2
        const smoothedVolume = THREE.MathUtils.lerp(prevVolume, normalizedVolume, smoothingFactor)
        prevVolume = smoothedVolume

        for (let i = 0; i < particles.particleCount; i++) {
          const i3 = i * 3
          const originalX = originalPositions.current[i3]
          const originalY = originalPositions.current[i3 + 1]
          const originalZ = originalPositions.current[i3 + 2]

          if (particles.movementTypes[i] === 1) {
            // Moving particles: Apply directional movement based on audio
            const movement = Math.sin(time * 2 + i) * smoothedVolume * 0.5
            positions[i3] = originalX * (currentScale + smoothedVolume * 0.3)
            positions[i3 + 1] = originalY * currentScale + movement // Add vertical movement
            positions[i3 + 2] = originalZ * (currentScale + smoothedVolume * 0.3)
          } else {
            // Stable particles: Slight pulsing effect only
            const scale = currentScale * (1 + smoothedVolume * 0.1)
            positions[i3] = originalX * scale
            positions[i3 + 1] = originalY * scale
            positions[i3 + 2] = originalZ * scale
          }
        }
      }

      pointsRef.current.rotation.y = time * 0.05
      pointsRef.current.rotation.x = Math.sin(time * 0.2) * 0.1
    }

    // Update the visible particle count
    pointsRef.current.geometry.setDrawRange(0, visibleParticleCount);
    pointsRef.current.geometry.attributes.position.needsUpdate = true
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={FULL_PARTICLE_COUNT}
          array={particles.positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={FULL_PARTICLE_COUNT}
          array={particles.colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        vertexColors
        size={0.01}
        sizeAttenuation={true}
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}

export default function LoadingAudioReactiveParticles() {
  //const [isLoading, setIsLoading] = useState(true) //Removed

  //Removed useEffect hook

  return (
    <div className="w-full h-screen bg-black relative">
      <Canvas camera={{ position: [0, 0, 2] }}>
        <ambientLight intensity={0.5} />
        <EffectComposer>
          <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} height={300} />
        </EffectComposer>
        <ParticleSystem />
      </Canvas>
      {/*Removed Loading div*/}
    </div>
  )
}

