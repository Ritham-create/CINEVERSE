import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Stars, Sparkles } from '@react-three/drei';
import * as THREE from 'three';

function GlowingSphere({ position, color, scale, speed = 1 }) {
  const mesh = useRef();

  useFrame((state) => {
    mesh.current.rotation.x = Math.sin(state.clock.elapsedTime * speed * 0.3) * 0.5;
    mesh.current.rotation.y += 0.003 * speed;
  });

  return (
    <Float speed={speed} rotationIntensity={0.8} floatIntensity={1.5} position={position}>
      <mesh ref={mesh} scale={scale}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.4}
          wireframe
          transparent
          opacity={0.6}
        />
      </mesh>
    </Float>
  );
}

function TorusShape({ position, color, scale }) {
  const mesh = useRef();

  useFrame((state) => {
    mesh.current.rotation.x = state.clock.elapsedTime * 0.15;
    mesh.current.rotation.z = state.clock.elapsedTime * 0.1;
  });

  return (
    <Float speed={1.5} rotationIntensity={1} floatIntensity={2} position={position}>
      <mesh ref={mesh} scale={scale}>
        <torusGeometry args={[1, 0.4, 16, 32]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.3}
          roughness={0.3}
          metalness={0.8}
          transparent
          opacity={0.5}
        />
      </mesh>
    </Float>
  );
}

function FloatingOrbs() {
  const orbs = useMemo(() => {
    return Array.from({ length: 8 }).map((_, i) => ({
      position: [
        (Math.random() - 0.5) * 16,
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 8 - 4
      ],
      scale: Math.random() * 0.3 + 0.1,
      speed: Math.random() * 1.5 + 0.5,
      color: i % 3 === 0 ? "#E50914" : i % 3 === 1 ? "#46d369" : "#f5c518",
    }));
  }, []);

  return (
    <>
      {orbs.map((orb, i) => (
        <Float key={i} speed={orb.speed} rotationIntensity={0.5} floatIntensity={2} position={orb.position}>
          <mesh scale={orb.scale}>
            <sphereGeometry args={[1, 16, 16]} />
            <meshStandardMaterial
              color={orb.color}
              emissive={orb.color}
              emissiveIntensity={1.5}
              toneMapped={false}
            />
          </mesh>
        </Float>
      ))}
    </>
  );
}

function Rig() {
  const { camera } = useThree();
  const mouse = useRef({ x: 0, y: 0 });
  const target = useMemo(() => new THREE.Vector3(), []);

  useFrame((state) => {
    mouse.current.x = THREE.MathUtils.lerp(mouse.current.x, state.pointer.x, 0.03);
    mouse.current.y = THREE.MathUtils.lerp(mouse.current.y, state.pointer.y, 0.03);
    target.set(mouse.current.x * 1.5, mouse.current.y * 1.5, 8);
    camera.position.lerp(target, 0.05);
    camera.lookAt(0, 0, 0);
  });

  return null;
}

export default function ThreeBackground() {
  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      zIndex: -1,
      background: 'linear-gradient(135deg, #050505 0%, #0a0a0a 50%, #0d0508 100%)',
    }}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        dpr={[1, 1.5]}
        performance={{ min: 0.5 }}
        gl={{ antialias: false, powerPreference: 'high-performance' }}
      >
        <color attach="background" args={['#050505']} />
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={0.8} />
        <pointLight position={[-5, -5, -5]} intensity={0.5} color="#E50914" />

        <Stars radius={80} depth={40} count={2000} factor={3} saturation={0} fade speed={0.8} />
        <Sparkles count={80} scale={10} size={1.5} speed={0.3} opacity={0.2} color="#ffffff" />

        <GlowingSphere position={[3.5, 1, -3]} color="#E50914" scale={1.8} speed={0.8} />
        <GlowingSphere position={[-4, -1, -5]} color="#ffffff" scale={1.2} speed={1.2} />

        <TorusShape position={[0, -2.5, -4]} color="#B20710" scale={1.0} />
        <TorusShape position={[-2, 3, -6]} color="#46d369" scale={0.7} />

        <FloatingOrbs />
        <Rig />
      </Canvas>
    </div>
  );
}
