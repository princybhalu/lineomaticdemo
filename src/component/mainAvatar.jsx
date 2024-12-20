// import React, { useRef, useMemo, useState } from 'react'
// import { Canvas, useFrame } from '@react-three/fiber'
// import * as THREE from 'three'

// function ParticleSystem({ isLoading }) {
//   const pointsRef = useRef(null)
//   const targetPositions = useRef(null)
//   const originalPositions = useRef(null)
//   const animationProgress = useRef(0)

//   const particles = useMemo(() => {
//     const particleCount = 8000
//     const positions = new Float32Array(particleCount * 3)
//     const colors = new Float32Array(particleCount * 3)
//     const dispersedPositions = new Float32Array(particleCount * 3)

//     for (let i = 0; i < particleCount; i++) {
//       const theta = Math.random() * Math.PI * 2
//       const phi = Math.random() * Math.PI
//       const r = 0.8 + Math.random() * 0.2

//       positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
//       positions[i * 3 + 1] = r * Math.cos(phi)
//       positions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta)

//       const direction = Math.floor(i / (particleCount / 4))
//       const spread = 3
//       switch (direction) {
//         case 0:
//           dispersedPositions[i * 3] = positions[i * 3] * spread
//           dispersedPositions[i * 3 + 1] = spread + Math.random()
//           dispersedPositions[i * 3 + 2] = positions[i * 3 + 2] * spread
//           break
//         case 1:
//           dispersedPositions[i * 3] = spread + Math.random()
//           dispersedPositions[i * 3 + 1] = positions[i * 3 + 1] * spread
//           dispersedPositions[i * 3 + 2] = positions[i * 3 + 2] * spread
//           break
//         case 2:
//           dispersedPositions[i * 3] = positions[i * 3] * spread
//           dispersedPositions[i * 3 + 1] = -spread - Math.random()
//           dispersedPositions[i * 3 + 2] = positions[i * 3 + 2] * spread
//           break
//         case 3:
//           dispersedPositions[i * 3] = -spread - Math.random()
//           dispersedPositions[i * 3 + 1] = positions[i * 3 + 1] * spread
//           dispersedPositions[i * 3 + 2] = positions[i * 3 + 2] * spread
//           break
//       }

//       const t = Math.random()
//       colors[i * 3] = 0.2 + 0.3 * t
//       colors[i * 3 + 1] = 0.5 + 0.5 * t
//       colors[i * 3 + 2] = 0.8 + 0.2 * t
//     }

//     originalPositions.current = positions.slice()
//     targetPositions.current = dispersedPositions.slice()

//     return { positions, colors, particleCount }
//   }, [])

//   useFrame(() => {
//     if (pointsRef.current) {
//       pointsRef.current.rotation.y += 0.005
//       pointsRef.current.rotation.x = Math.sin(animationProgress.current * 0.2) * 0.1

//       const targetProgress = isLoading ? 1 : 0
//       animationProgress.current += (targetProgress - animationProgress.current) * 0.05

//       const positions = pointsRef.current.geometry.attributes.position.array
//       for (let i = 0; i < particles.particleCount * 3; i++) {
//         positions[i] = THREE.MathUtils.lerp(
//           originalPositions.current[i],
//           targetPositions.current[i],
//           animationProgress.current
//         )
//       }
//       pointsRef.current.geometry.attributes.position.needsUpdate = true
//     }
//   })

//   return (
//     <points ref={pointsRef}>
//       <bufferGeometry>
//         <bufferAttribute
//           attach="attributes-position"
//           count={particles.particleCount}
//           array={particles.positions}
//           itemSize={3}
//         />
//         <bufferAttribute
//           attach="attributes-color"
//           count={particles.particleCount}
//           array={particles.colors}
//           itemSize={3}
//         />
//       </bufferGeometry>
//       <pointsMaterial
//         vertexColors
//         size={0.015}
//         sizeAttenuation={true}
//         transparent
//         opacity={0.8}
//         blending={THREE.AdditiveBlending}
//         depthWrite={false}
//       />
//     </points>
//   )
// }

// export function ParticleAvatar() {
//   const [isLoading, setIsLoading] = useState(false)

//   return (
//     <div className="relative h-screen w-full bg-gray-950">
//       <Canvas camera={{ position: [0, 0, 2] }}>
//         <ambientLight intensity={0.5} />
//         <ParticleSystem isLoading={isLoading} />
//       </Canvas>
//       <button
//         className="absolute top-4 left-4 px-4 py-2 bg-blue-500 text-white rounded"
//         onClick={() => setIsLoading(!isLoading)}
//       >
//         Toggle Animation
//       </button>
//     </div>
//   )
// }

// import React, { useRef, useMemo, useState, useEffect } from 'react'
// import { Canvas, useFrame } from '@react-three/fiber'
// import * as THREE from 'three'

// function ParticleSystem({ isLoading }) {
//   const pointsRef = useRef<THREE.Points>(null)
//   const targetPositions = useRef<Float32Array | null>(null)
//   const originalPositions = useRef<Float32Array | null>(null)
//   const animationProgress = useRef(0)
//   const particleSizes = useRef<Float32Array | null>(null)

//   const particles = useMemo(() => {
//     const particleCount = 8000
//     const positions = new Float32Array(particleCount * 3)
//     const colors = new Float32Array(particleCount * 3)
//     const dispersedPositions = new Float32Array(particleCount * 3)
//     const sizes = new Float32Array(particleCount)

//     for (let i = 0; i < particleCount; i++) {
//       // Original sphere positions
//       const theta = Math.random() * Math.PI * 2
//       const phi = Math.random() * Math.PI
//       const r = 0.8 + Math.random() * 0.2

//       positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
//       positions[i * 3 + 1] = r * Math.cos(phi)
//       positions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta)

//       // Dispersed positions with more spread and variation
//       const direction = Math.floor(i / (particleCount / 4))
//       const spread = 4 // Increased spread
//       const randomOffset = Math.random() * 2 - 1 // Random offset for more organic look
      
//       switch (direction) {
//         case 0: // Top
//           dispersedPositions[i * 3] = positions[i * 3] * spread + randomOffset
//           dispersedPositions[i * 3 + 1] = spread + Math.random() * 2
//           dispersedPositions[i * 3 + 2] = positions[i * 3 + 2] * spread + randomOffset
//           break
//         case 1: // Right
//           dispersedPositions[i * 3] = spread + Math.random() * 2
//           dispersedPositions[i * 3 + 1] = positions[i * 3 + 1] * spread + randomOffset
//           dispersedPositions[i * 3 + 2] = positions[i * 3 + 2] * spread + randomOffset
//           break
//         case 2: // Bottom
//           dispersedPositions[i * 3] = positions[i * 3] * spread + randomOffset
//           dispersedPositions[i * 3 + 1] = -spread - Math.random() * 2
//           dispersedPositions[i * 3 + 2] = positions[i * 3 + 2] * spread + randomOffset
//           break
//         case 3: // Left
//           dispersedPositions[i * 3] = -spread - Math.random() * 2
//           dispersedPositions[i * 3 + 1] = positions[i * 3 + 1] * spread + randomOffset
//           dispersedPositions[i * 3 + 2] = positions[i * 3 + 2] * spread + randomOffset
//           break
//       }

//       // Enhanced color gradient from cyan to purple
//       const t = Math.random()
//       colors[i * 3] = 0.3 + 0.4 * t      // More red for purple tint
//       colors[i * 3 + 1] = 0.6 + 0.4 * t  // Enhanced cyan
//       colors[i * 3 + 2] = 0.9 + 0.1 * t  // Brighter blue

//       // Variable particle sizes
//       sizes[i] = 0.02 + Math.random() * 0.03
//     }

//     originalPositions.current = positions.slice()
//     targetPositions.current = dispersedPositions.slice()
//     particleSizes.current = sizes

//     return { positions, colors, particleCount, sizes }
//   }, [])

//   useFrame((state) => {
//     if (!originalPositions.current || !targetPositions.current || !particleSizes.current) return;
  
//     const positions = pointsRef.current.geometry.attributes.position.array;
  
//     for (let i = 0; i < particles.particleCount * 3; i += 3) {
//       const wave = Math.sin(state.clock.elapsedTime * 2 + positions[i] * 2) * 0.1;
  
//       positions[i] = THREE.MathUtils.lerp(
//         originalPositions.current[i],
//         targetPositions.current[i],
//         animationProgress.current
//       );
//       positions[i + 1] = THREE.MathUtils.lerp(
//         originalPositions.current[i + 1] + wave,
//         targetPositions.current[i + 1],
//         animationProgress.current
//       );
//       positions[i + 2] = THREE.MathUtils.lerp(
//         originalPositions.current[i + 2],
//         targetPositions.current[i + 2],
//         animationProgress.current
//       );
//     }
  
//     pointsRef.current.geometry.attributes.position.needsUpdate = true;
//   });
  

//   return (
//     <points ref={pointsRef}>
//       <bufferGeometry>
//         <bufferAttribute
//           attach="attributes-position"
//           count={particles.particleCount}
//           array={particles.positions}
//           itemSize={3}
//         />
//         <bufferAttribute
//           attach="attributes-color"
//           count={particles.particleCount}
//           array={particles.colors}
//           itemSize={3}
//         />
//       </bufferGeometry>
//       <pointsMaterial
//         vertexColors
//         size={0.02}
//         sizeAttenuation={true}
//         transparent
//         opacity={0.9}
//         blending={THREE.AdditiveBlending}
//         depthWrite={false}
//       />
//     </points>
//   )
// }

// export function ParticleAvatar() {
//   const [isLoading, setIsLoading] = useState(false)

//   return (
//     <div className="relative h-screen w-full bg-gray-950">
//       <Canvas camera={{ position: [0, 0, 2.5] }}>
//         <ambientLight intensity={0.8} />
//         <ParticleSystem isLoading={isLoading} />
//       </Canvas>
//       <button
//         className="absolute top-4 left-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded transition-colors"
//         onClick={() => setIsLoading(!isLoading)}
//       >
//         Toggle Animation
//       </button>
//     </div>
//   )
// }


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

    // Create sphere formation
    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.random() * Math.PI
      const r = 0.8 + Math.random() * 0.2

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.cos(phi)
      positions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta)

      // Create cyclonic dispersed positions
      const angle = (i / particleCount) * Math.PI * 2
      const radius = 2 + Math.random() * 3
      const height = (Math.random() - 0.5) * 4

      dispersedPositions[i * 3] = Math.cos(angle) * radius
      dispersedPositions[i * 3 + 1] = height
      dispersedPositions[i * 3 + 2] = Math.sin(angle) * radius

      // Enhanced blue-white color palette
      const t = Math.random()
      colors[i * 3] = 0.2 + 0.4 * t     // More blue
      colors[i * 3 + 1] = 0.5 + 0.5 * t // More white
      colors[i * 3 + 2] = 0.9 + 0.1 * t // Intense blue
    }

    originalPositions.current = positions.slice()
    targetPositions.current = dispersedPositions.slice()

    return { positions, colors, particleCount }
  }, [])

  useFrame((state) => {
    if (!pointsRef.current) return

    time.current += 0.01
    const positions = pointsRef.current.geometry.attributes.position.array

    if (isLoading) {
      // Enhanced cyclone animation
      pointsRef.current.rotation.y += 0.01
      pointsRef.current.rotation.x = Math.sin(time.current * 0.5) * 0.2
      
      // Update particle positions for cyclone effect
      for (let i = 0; i < particles.particleCount; i++) {
        const idx = i * 3
        const angle = (i / particles.particleCount) * Math.PI * 2 + time.current
        const radius = 2 + Math.sin(time.current + i * 0.1) * 0.5
        
        targetPositions.current[idx] = Math.cos(angle) * radius
        targetPositions.current[idx + 1] = Math.sin(time.current * 0.5 + i * 0.01) * 2
        targetPositions.current[idx + 2] = Math.sin(angle) * radius
      }

      animationProgress.current += (1 - animationProgress.current) * 0.03
    } else {
      // Smooth return to sphere formation
      pointsRef.current.rotation.y += 0.003
      pointsRef.current.rotation.x *= 0.95
      animationProgress.current += (0 - animationProgress.current) * 0.05
    }

    // Smooth interpolation between formations
    for (let i = 0; i < particles.particleCount * 3; i++) {
      positions[i] = THREE.MathUtils.lerp(
        originalPositions.current[i],
        targetPositions.current[i],
        animationProgress.current
      )
    }
    
    pointsRef.current.geometry.attributes.position.needsUpdate = true
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
        size={0.02}
        sizeAttenuation={true}
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}

export function ParticleAvatar() {
  const [isLoading, setIsLoading] = useState(false)

  return (
    <div className="relative h-screen w-full bg-gray-950">
      <Canvas camera={{ position: [0, 0, 2.5] }}>
        <ambientLight intensity={0.5} />
        <ParticleSystem isLoading={isLoading} />
      </Canvas>
      <button
        className="absolute top-4 left-4 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={() => setIsLoading(!isLoading)}
      >
        Toggle Animation
      </button>
    </div>
  )
}