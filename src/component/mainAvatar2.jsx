import React, { useRef, useMemo, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function ParticleSystem({ isLoading }) {
  const pointsRef = useRef(null)
  const targetPositions = useRef(null)
  const originalPositions = useRef(null)
  const animationProgress = useRef(0)
  const time = useRef(0)

  const particles = useMemo(() => {
    const particleCount = 8000
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)
    const dispersedPositions = new Float32Array(particleCount * 3)

    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.random() * Math.PI
      const r = 0.8 + Math.random() * 0.2

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.cos(phi)
      positions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta)

      // Spread particles across the entire screen
      dispersedPositions[i * 3] = (Math.random() - 0.5) * 6
      dispersedPositions[i * 3 + 1] = (Math.random() - 0.5) * 4
      dispersedPositions[i * 3 + 2] = (Math.random() - 0.5) * 6

      const t = Math.random()
      colors[i * 3] = 2 / 255 // Red
      colors[i * 3 + 1] = 160 / 255 // Green
      colors[i * 3 + 2] = 224 / 255 // Blue
    }

    originalPositions.current = positions.slice()
    targetPositions.current = dispersedPositions.slice()

    return { positions, colors, particleCount }
  }, [])

  useFrame(() => {
    if (pointsRef.current) {
      time.current += 0.01
      pointsRef.current.rotation.y += 0.002
      pointsRef.current.rotation.x = Math.sin(time.current * 0.2) * 0.1

      const targetProgress = isLoading ? 1 : 0
      animationProgress.current += (targetProgress - animationProgress.current) * 0.05

      const positions = pointsRef.current.geometry.attributes.position.array
      for (let i = 0; i < particles.particleCount; i++) {
        const idx = i * 3
        const originalX = originalPositions.current[idx]
        const originalY = originalPositions.current[idx + 1]
        const originalZ = originalPositions.current[idx + 2]

        const targetX = targetPositions.current[idx]
        const targetY = targetPositions.current[idx + 1]
        const targetZ = targetPositions.current[idx + 2]

        // Add wave-like motion
        const waveOffsetY = Math.sin(time.current * 2 + i * 0.1) * 0.2
        const waveOffsetX = Math.cos(time.current * 1.5 + i * 0.05) * 0.2
        const waveOffsetZ = Math.sin(time.current * 1.8 + i * 0.07) * 0.2

        positions[idx] = THREE.MathUtils.lerp(originalX, targetX + waveOffsetX, animationProgress.current)
        positions[idx + 1] = THREE.MathUtils.lerp(originalY, targetY + waveOffsetY, animationProgress.current)
        positions[idx + 2] = THREE.MathUtils.lerp(originalZ, targetZ + waveOffsetZ, animationProgress.current)
      }
      pointsRef.current.geometry.attributes.position.needsUpdate = true
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

export default function ParticleAvatar({isLoading , setIsLoading }) {
  // const [isLoading, setIsLoading] = useState(false)

  return (
    <>
    {/* <div className="relative h-screen w-full bg-gray-950"> */}
      <Canvas camera={{ position: [0, 0, 2] }}>
        <ambientLight intensity={0.5} />
        <ParticleSystem isLoading={isLoading} />
      </Canvas>
    </>
  )
}