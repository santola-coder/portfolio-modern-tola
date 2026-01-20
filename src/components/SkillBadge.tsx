import React from 'react';
import { motion } from 'framer-motion';
interface SkillBadgeProps {
  name: string;
  icon?: React.ReactNode;
  index?: number;
}
export function SkillBadge({
  name,
  icon,
  index = 0
}: SkillBadgeProps) {
  return <motion.div initial={{
    opacity: 0,
    scale: 0.8,
    y: 20
  }} whileInView={{
    opacity: 1,
    scale: 1,
    y: 0
  }} viewport={{
    once: true
  }} transition={{
    duration: 0.4,
    delay: index * 0.05,
    type: 'spring',
    stiffness: 100
  }} whileHover={{
    scale: 1.05,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    y: -5
  }} animate={{
    y: [0, -4, 0]
  }}
  // Floating animation with random delays for organic feel
  transition={{
    y: {
      duration: 2 + Math.random(),
      repeat: Infinity,
      repeatType: 'reverse',
      ease: 'easeInOut',
      delay: Math.random() * 2
    }
  }} className="
        flex items-center gap-2 
        px-4 py-2 
        rounded-full 
        bg-white/5 border border-white/10 
        backdrop-blur-md 
        text-sm font-medium text-white/90
        cursor-default
        hover:border-neon-cyan/30 hover:shadow-[0_0_15px_rgba(0,243,255,0.1)]
        transition-colors
      ">
      {icon && <span className="text-neon-cyan">{icon}</span>}
      <span>{name}</span>
    </motion.div>;
}