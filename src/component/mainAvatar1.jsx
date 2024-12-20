import React, { useRef, useMemo, useState , useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

function ParticleSystem({ isLoading }) {
  const pointsRef = useRef(null)
  const targetPositions = useRef(null)
  const originalPositions = useRef(null)
  const animationProgress = useRef(0)
  const time = useRef(0)
  const randomOffsets = useRef(null)

  const particles = useMemo(() => {
    const particleCount = 1000
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)
    const randOffsets = new Float32Array(particleCount * 3)

    for (let i = 0; i < particleCount; i++) {
      const theta = Math.random() * Math.PI * 2
      const phi = Math.random() * Math.PI
      const r = 0.8 + Math.random() * 0.2

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.cos(phi)
      positions[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta)

      randOffsets[i * 3] = (Math.random() - 0.5) * 2
      randOffsets[i * 3 + 1] = (Math.random() - 0.5) * 2
      randOffsets[i * 3 + 2] = (Math.random() - 0.5) * 2

      const t = Math.random()
      colors[i * 3] = 2 / 255    // अधिक लाल
      colors[i * 3 + 1] = 160 / 255 // कम हरा
      colors[i * 3 + 2] =  224 / 255 // अधिक नीला
    }

    originalPositions.current = positions.slice()
    targetPositions.current = new Float32Array(particleCount * 3)
    randomOffsets.current = randOffsets

    return { positions, colors, particleCount }
  }, [])

  useFrame(() => {
    if (!pointsRef.current) return

    time.current += 0.01
    const positions = pointsRef.current.geometry.attributes.position.array
    const count = particles.particleCount
    const randOffsets = randomOffsets.current

    const turns = 4
    const maxRadius = 6
    const maxHeight = 6
    const thickness = 1

    if (isLoading) {
      for (let i = 0; i < count; i++) {
        const idx = i * 3
        const s = i / (count - 1)
        const angle = s * turns * Math.PI * 2 + time.current * 0.5
        const baseRadius = maxRadius * (1 - Math.pow(1 - s, 3))

        const rx = randOffsets[idx]
        const ry = randOffsets[idx + 1]
        const rz = randOffsets[idx + 2]

        const offsetAngle = angle + rx * 0.5
        const pulseFactor = Math.sin(time.current * 2 + s * 10) * 0.2 + 1 // पल्सेटिंग इफेक्ट
        const localRadius = (baseRadius + ry * thickness) * pulseFactor
        const x = localRadius * Math.cos(offsetAngle)
        const z = localRadius * Math.sin(offsetAngle)
        const y = ((s - 0.5) * maxHeight + rz * thickness) * pulseFactor

        targetPositions.current[idx] = x
        targetPositions.current[idx + 1] = y
        targetPositions.current[idx + 2] = z
      }

      pointsRef.current.rotation.y += 0.005
      pointsRef.current.rotation.z = Math.sin(time.current * 0.5) * 0.1

      animationProgress.current += (1 - animationProgress.current) * 0.03
    } else {
      pointsRef.current.rotation.y += 0.001
      pointsRef.current.rotation.z *= 0.95
      animationProgress.current += (0 - animationProgress.current) * 0.05
    }

    for (let i = 0; i < count * 3; i++) {
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
        size={0.03} // पार्टिकल का आकार बढ़ाया गया
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
  const [isLoading, setIsLoading] = useState(false)

  const isLoadingRef = useRef(isLoading)
useEffect(() => {
  isLoadingRef.current = isLoading
}, [isLoading])

  return (
    <>
     <div className="relative h-screen w-full bg-gray-950">
      
             <Canvas camera={{ position: [0, 0, isLoading ? 10 : 3 ], fov: 60 }}>
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
    </>
  )
}

