import React, { useRef, useState, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

const Particles = ({ count = 1000, particleSize = 0.05 }) => {
  const pointsRef = useRef()
  const analyserRef = useRef()
  const [audioData, setAudioData] = useState(new Uint8Array(0))
  const originalPositions = useRef(new Float32Array(count * 3))
  const particles = {
    particleCount: count,
    movementTypes: Array.from({ length: count }, () => Math.random() < 0.5 ? 1 : 0) // 50% moving, 50% static
  }

  useEffect(() => {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)()
    const source = audioCtx.createMediaElementSource(document.getElementById('audio'))
    analyserRef.current = audioCtx.createAnalyser()
    source.connect(analyserRef.current)
    analyserRef.current.fftSize = 2048
    // Connect to output
    analyserRef.current.connect(audioCtx.destination)
  }, [])

  useEffect(() => {
    if (!pointsRef.current) return
    const positions = pointsRef.current.geometry.attributes.position.array
    for (let i = 0; i < particles.particleCount; i++) {
      originalPositions.current[i * 3] = positions[i * 3]
      originalPositions.current[i * 3 + 1] = positions[i * 3 + 1]
      originalPositions.current[i * 3 + 2] = positions[i * 3 + 2]
    }
  }, [pointsRef])


  useFrame((state) => {
    if (!pointsRef.current || !analyserRef.current) return

    const dataArray = new Uint8Array(analyserRef.current.frequencyBinCount)
    analyserRef.current.getByteFrequencyData(dataArray)
    setAudioData(dataArray)

    const average = dataArray.reduce((a, b) => a + b, 0) / dataArray.length
    const normalizedVolume = average / 255

    const positions = pointsRef.current.geometry.attributes.position.array
    for (let i = 0; i < particles.particleCount; i++) {
      if (particles.movementTypes[i] === 1) {
        const originalX = originalPositions.current[i * 3]
        const originalY = originalPositions.current[i * 3 + 1]
        const originalZ = originalPositions.current[i * 3 + 2]

        // Moving particles: Apply directional movement based on audio
        const movement = Math.sin(state.clock.elapsedTime * 2 + i) * normalizedVolume * 0.5
        positions[i * 3] = originalX * (1 + normalizedVolume * 0.3)
        positions[i * 3 + 1] = originalY + movement // Add vertical movement
        positions[i * 3 + 2] = originalZ * (1 + normalizedVolume * 0.3)
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
          array={new Float32Array(particles.particleCount * 3).fill(0).map((v, i) => {
            const phi = Math.acos(-1 + (2 * (i % 1000) / 1000))
            const theta = Math.sqrt(1000 * Math.PI) * (i / 1000)
            const x = 5 * Math.sin(phi) * Math.cos(theta)
            const y = 5 * Math.cos(phi)
            const z = 5 * Math.sin(phi) * Math.sin(theta)
            return [x, y, z]
          }).flat()}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={particleSize} color={'white'} sizeAttenuation={true} />
    </points>
  )
}

const App = () => {
  return (
    <>
      <audio id="audio" src="your_audio_file.mp3" autoPlay loop /> {/* Replace with your audio file */}
      <Canvas camera={{ position: [0, 0, 10] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Particles count={1000} />
        <OrbitControls />
      </Canvas>
    </>
  )
}

export default App

