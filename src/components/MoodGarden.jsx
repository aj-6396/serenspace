import React, { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Float, Sphere, MeshDistortMaterial, Text } from '@react-three/drei'
import * as THREE from 'three'
import useWellnessStore from '../context/useWellnessStore'
import { getEmotion } from '../utils/emotions'

function MoodNode({ entry, index, total }) {
  const mesh = useRef()
  const emotion = getEmotion(entry.emotionId)
  
  // Map emotion to colors based on new calm palette
  const color = useMemo(() => {
    if (!emotion) return '#CBD5E1' // slate-300
    if (emotion.id === 'happy') return '#4DB6AC'   // Soft Teal
    if (emotion.id === 'neutral') return '#94A3B8' // Slate
    if (emotion.id === 'sad') return '#8BC34A'     // Sage
    if (emotion.id === 'angry') return '#FF8A65'   // Muted Coral
    if (emotion.id === 'anxious') return '#9575CD' // Lavender
    return '#CBD5E1'
  }, [emotion])

  const position = useMemo(() => {
    const angle = (index / total) * Math.PI * 2
    const radius = 2 + Math.random() * 2.5
    return [
      Math.cos(angle) * radius,
      (Math.random() - 0.5) * 4,
      Math.sin(angle) * radius
    ]
  }, [index, total])

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.position.y += Math.sin(state.clock.elapsedTime + index) * 0.003
      mesh.current.rotation.x += 0.005
      mesh.current.rotation.y += 0.005
    }
  })

  return (
    <Float speed={1.5} rotationIntensity={0.8} floatIntensity={0.8}>
      <mesh position={position} ref={mesh}>
        <sphereGeometry args={[0.35, 32, 32]} />
        <MeshDistortMaterial 
          color={color} 
          speed={3} 
          distort={0.4} 
          radius={1} 
          emissive={color} 
          emissiveIntensity={0.4} 
        />
      </mesh>
    </Float>
  )
}

export default function MoodGarden() {
  const journalEntries = useWellnessStore(s => s.journalEntries)
  
  return (
    <div className="w-full h-[550px] rounded-[48px] overflow-hidden glass-card bg-white/10 relative border border-white/20 shadow-2xl shadow-teal-500/5">
      <div className="absolute top-8 left-10 z-10 space-y-2">
        <h3 className="text-2xl font-bold text-[var(--text-main)] font-heading tracking-tight">Emotional Landscape</h3>
        <p className="text-[10px] text-[var(--text-muted)] uppercase tracking-[0.2em] font-bold font-heading">Your journey visualized in 3D</p>
      </div>
      
      <Canvas camera={{ position: [0, 0, 12], fov: 45 }}>
        <ambientLight intensity={0.6} />
        <pointLight position={[10, 10, 10]} intensity={1.5} />
        <spotLight position={[-10, 10, 10]} angle={0.2} penumbra={1} />
        
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

        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.4} />
      </Canvas>

      {journalEntries.length === 0 && (
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none space-y-4">
          <div className="w-16 h-16 rounded-full bg-teal-50 flex items-center justify-center text-teal-300">
            <Sparkles size={32} />
          </div>
          <p className="text-sm text-[var(--text-muted)] font-body italic opacity-60">Your garden will bloom as you reflect...</p>
        </div>
      )}
    </div>
  )
}
