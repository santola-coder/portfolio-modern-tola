import React, { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  delay?: number;
  tiltEffect?: boolean;
}
export function GlassCard({
  children,
  className = '',
  hoverEffect = false,
  delay = 0,
  tiltEffect = false
}: GlassCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  // Mouse position state for glow effect
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0
  });
  const [isHovering, setIsHovering] = useState(false);
  // Tilt effect logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['7deg', '-7deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-7deg', '7deg']);
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    // Calculate mouse position relative to card for glow
    const clientX = e.clientX - rect.left;
    const clientY = e.clientY - rect.top;
    setMousePosition({
      x: clientX,
      y: clientY
    });
    // Calculate normalized position for tilt
    if (tiltEffect) {
      const width = rect.width;
      const height = rect.height;
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      const xPct = mouseX / width - 0.5;
      const yPct = mouseY / height - 0.5;
      x.set(xPct);
      y.set(yPct);
    }
  };
  const handleMouseLeave = () => {
    setIsHovering(false);
    if (tiltEffect) {
      x.set(0);
      y.set(0);
    }
  };
  const handleMouseEnter = () => {
    setIsHovering(true);
  };
  return <motion.div ref={ref} initial={{
    opacity: 0,
    y: 20
  }} whileInView={{
    opacity: 1,
    y: 0
  }} viewport={{
    once: true,
    margin: '-50px'
  }} transition={{
    duration: 0.5,
    delay,
    type: 'spring',
    stiffness: 50
  }} onMouseMove={handleMouseMove} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} style={{
    rotateX: tiltEffect ? rotateX : 0,
    rotateY: tiltEffect ? rotateY : 0,
    transformStyle: 'preserve-3d'
  }} className={`
        relative overflow-hidden
        backdrop-blur-xl bg-white/10 
        border border-white/10 
        shadow-2xl shadow-black/20
        rounded-2xl
        ${className}
      `}>
      {/* Dynamic Glow Effect */}
      <div className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100" style={{
      opacity: isHovering ? 1 : 0,
      background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255,255,255,0.1), transparent 40%)`
    }} />

      {/* Subtle gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />

      {/* Content */}
      <div className="relative z-10" style={{
      transform: 'translateZ(20px)'
    }}>
        {children}
      </div>
    </motion.div>;
}