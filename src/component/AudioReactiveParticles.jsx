import { Canvas } from '@react-three/fiber';
import L2 from './l2'; // Import the L2 component
import ParticleAvatar from './ParticleAvatar'; // Import ParticleAvatar component
import Avatar from './avatar'; // Import Avatar component

export default function AudioReactiveParticles({ state }) {
  return (
    <Canvas camera={{ position: [0, 0, 2] }}>
      <ambientLight intensity={0.5} />
      {/* Render the components based on the state */}
      {state === 'loading' && <L2 />}
      {state === 'not listening' && <ParticleAvatar />}
      {state === 'listening' && <Avatar />}
    </Canvas>
  );
}
