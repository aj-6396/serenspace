import React, { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Float, Sphere, MeshDistortMaterial, Text } from '@react-three/drei'
import * as THREE from 'three'
import useWellnessStore from '../context/useWellnessStore'
import { getEmotion } from '../utils/emotions'

function MoodNode({ entry, index, total }) {
  const mesh = useRef()
  const emotion = getEmotion(entry.emotionId)
  
  // Map emotion to colors
  const color = useMemo(() => {
    if (!emotion) return '#e2e8f0'
    if (['happy'].includes(emotion.id)) return '#fcd34d' // amber
    if (['sad', 'anxious'].includes(emotion.id)) return '#a5b4fc' // indigo
    if (['angry'].includes(emotion.id)) return '#fda4af' // rose
    return '#d1d5db' // neutral
  }, [emotion])

  const position = useMemo(() => {
    const angle = (index / total) * Math.PI * 2
    const radius = 2 + Math.random() * 2
    return [
      Math.cos(angle) * radius,
      (Math.random() - 0.5) * 3,
      Math.sin(angle) * radius
    ]
  }, [index, total])

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.position.y += Math.sin(state.clock.elapsedTime + index) * 0.002
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh position={position} ref={mesh}>
        <sphereGeometry args={[0.3, 32, 32]} />
        <MeshDistortMaterial 
          color={color} 
          speed={2} 
          distort={0.3} 
          radius={1} 
          emissive={color} 
          emissiveIntensity={0.5} 
        />
      </mesh>
    </Float>
  )
}

export default function MoodGarden() {
  const journalEntries = useWellnessStore(s => s.journalEntries)
  
  return (
    <div className="w-full h-[500px] rounded-[40px] overflow-hidden glass-card bg-slate-950/20 relative border border-white/10">
      <div className="absolute top-6 left-8 z-10 space-y-1">
        <h3 className="text-xl font-bold text-[var(--text-main)]">Mood Garden</h3>
        <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-widest font-bold">Your emotional landscape in 3D</p>
      </div>
      
      <Canvas camera={{ position: [0, 0, 10], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} />
        
        <group>
          {journalEntries.map((entry, i) => (
            <MoodNode 
              key={entry.id} 
              entry={entry} 
              index={i} 
              total={journalEntries.length} 
            />
          ))}
        </group>

        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>

      {journalEntries.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <p className="text-sm text-[var(--text-muted)] italic">Write more entries to populate your garden</p>
        </div>
      )}
    </div>
  )
}
