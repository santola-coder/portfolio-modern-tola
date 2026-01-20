import React from 'react';
import { ExternalLink, Github, ArrowUpRight } from 'lucide-react';
import { GlassCard } from './GlassCard';
import { motion } from 'framer-motion';


interface ProjectCardProps {
  title: string;
  description: string;
  tags: string[];
  image?: string;
  demoUrl?: string;
  githubUrl?: string;
  index?: number;
}
export function ProjectCard({
  title,
  description,
  tags,
  image,
  demoUrl = '#',
  githubUrl = '#',
  index = 0
}: ProjectCardProps) {
  return <GlassCard className="h-full flex flex-col group" hoverEffect delay={index * 0.1} tiltEffect>
      {/* Image Placeholder Area */}
      <div className="h-48 w-full bg-black/20 relative overflow-hidden group-hover:bg-black/30 transition-colors rounded-t-xl">
        {image ? <motion.img src={image} alt={title} className="w-full h-full object-cover opacity-80" whileHover={{
        scale: 1.1
      }} transition={{
        duration: 0.5
      }} /> : <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-neon-purple to-neon-blue blur-xl opacity-50 group-hover:opacity-80 transition-opacity" />
          </div>}

        {/* Overlay Actions */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4 backdrop-blur-sm">
          <motion.a href={demoUrl} whileHover={{
          scale: 1.1,
          rotate: 5
        }} whileTap={{
          scale: 0.9
        }} className="p-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-all" aria-label="View Demo">
            <ExternalLink size={20} />
          </motion.a>
          <motion.a href={githubUrl} whileHover={{
          scale: 1.1,
          rotate: -5
        }} whileTap={{
          scale: 0.9
        }} className="p-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white transition-all" aria-label="View Code">
            <Github size={20} />
          </motion.a>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold text-white group-hover:text-neon-cyan transition-colors">
            {title}
          </h3>
          <ArrowUpRight className="text-white/30 group-hover:text-neon-cyan group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" size={20} />
        </div>

        <p className="text-gray-300 text-sm leading-relaxed mb-6 flex-1">
          {description}
        </p>

        <div className="flex flex-wrap gap-2 mt-auto">
          {tags.map((tag, i) => <motion.span key={tag} initial={{
          opacity: 0,
          y: 10
        }} whileInView={{
          opacity: 1,
          y: 0
        }} transition={{
          delay: 0.2 + i * 0.05
        }} className="text-xs font-medium px-2.5 py-1 rounded-md bg-white/5 text-white/70 border border-white/5 hover:border-neon-cyan/30 hover:text-neon-cyan transition-colors">
              {tag}
            </motion.span>)}
        </div>
      </div>
    </GlassCard>;
}