
import React, { useRef, useEffect } from 'react'
import * as THREE from 'three'
import { useThree, Canvas } from '@react-three/fiber'
import { useSpring, a } from '@react-spring/three'

// Helper component for creating a connection between two points
const Connection = ({ start, end, color }) => {
  const ref = useRef()

  useEffect(() => {
    if (ref.current) {
      ref.current.geometry.setFromPoints([start, end].map(point => new THREE.Vector3(...point)))
    }
  }, [start, end])

  return (
    <line ref={ref}>
      <bufferGeometry />
      <lineBasicMaterial color={color} />
    </line>
  )
}

// Node component representing data points or AI nodes
const Node = ({ position, color, isHovered }) => {
  const mesh = useRef()
  const [spring, api] = useSpring(() => ({
    scale: [1, 1, 1],
    color: color,
    config: { mass: 2, tension: 150, friction: 20 }
  }))

  useEffect(() => {
    api.start({
      scale: isHovered ? [1.5, 1.5, 1.5] : [1, 1, 1],
      color: isHovered ? '#ff0000' : color
    })
  }, [isHovered, color, api])

  return (
    <a.mesh position={position} ref={mesh} scale={spring.scale}>
      <sphereGeometry args={[0.1, 32, 32]} />
      <a.meshStandardMaterial color={spring.color} />
    </a.mesh>
  )
}

// Main scene component
const Scene = ({ hoveredSection }) => {
  const { camera } = useThree()
  const groupRef = useRef()

  useEffect(() => {
    camera.position.z = 5
  }, [camera])

  // Define node positions
  const nodes = [
    { position: [-2, 1, 0], section: 'inquiries' },
    { position: [-1, -1, 0], section: 'quotations' },
    { position: [1, 1, 0], section: 'salesOrders' },
    { position: [2, -1, 0], section: 'acknowledgmentForms' }
  ]

  // Define connections between nodes
  const connections = [
    { start: nodes[0].position, end: nodes[1].position },
    { start: nodes[1].position, end: nodes[2].position },
    { start: nodes[2].position, end: nodes[3].position },
    { start: nodes[3].position, end: nodes[0].position }
  ]

  return (
    <group ref={groupRef}>
      {nodes.map((node, index) => (
        <Node
          key={index}
          position={node.position}
          color={hoveredSection === node.section ? '#ff0000' : '#00ff00'}
          isHovered={hoveredSection === node.section}
        />
      ))}
      {connections.map((connection, index) => (
        <Connection
          key={index}
          start={connection.start}
          end={connection.end}
          color="#ffffff"
        />
      ))}
    </group>
  )
}

const InteractiveBackground = ({ hoveredSection }) => {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1 }}>
      <Canvas>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Scene hoveredSection={hoveredSection} />
      </Canvas>
    </div>
  )
}

export default InteractiveBackground

