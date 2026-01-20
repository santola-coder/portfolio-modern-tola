import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Loader2, CheckCircle2 } from 'lucide-react';
import { GlassCard } from './GlassCard';
export function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
      setTimeout(() => setIsSent(false), 3000);
    }, 1500);
  };
  const inputVariants = {
    focus: {
      scale: 1.02,
      borderColor: 'rgba(188, 19, 254, 0.5)'
    },
    blur: {
      scale: 1,
      borderColor: 'rgba(255, 255, 255, 0.1)'
    }
  };
  return <GlassCard className="max-w-xl mx-auto w-full p-8" tiltEffect>
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-white mb-2">
          Let's Work Together
        </h3>
        <p className="text-gray-400">
          Have a project in mind? Send me a message.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-gray-300">
            Email Address
          </label>
          <motion.input variants={inputVariants} animate={focusedField === 'email' ? 'focus' : 'blur'} onFocus={() => setFocusedField('email')} onBlur={() => setFocusedField(null)} type="email" id="email" required className="w-full px-4 py-3 rounded-xl bg-black/20 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-neon-purple/50 transition-all" placeholder="hello@example.com" />
        </div>

        <div className="space-y-2">
          <label htmlFor="message" className="block text-sm font-medium text-gray-300">
            Message
          </label>
          <motion.textarea variants={inputVariants} animate={focusedField === 'message' ? 'focus' : 'blur'} onFocus={() => setFocusedField('message')} onBlur={() => setFocusedField(null)} id="message" required rows={4} className="w-full px-4 py-3 rounded-xl bg-black/20 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-neon-purple/50 transition-all resize-none" placeholder="Tell me about your project..." />
        </div>

        <motion.button whileHover={{
        scale: 1.02
      }} whileTap={{
        scale: 0.98
      }} type="submit" disabled={isSubmitting || isSent} className={`
            w-full py-4 rounded-xl font-bold text-white
            flex items-center justify-center gap-2
            transition-all duration-300
            ${isSent ? 'bg-green-500/20 border border-green-500/50 text-green-400' : 'bg-gradient-to-r from-neon-purple to-neon-blue hover:opacity-90 hover:shadow-lg hover:shadow-neon-purple/25'}
            disabled:opacity-50 disabled:cursor-not-allowed
          `}>
          <AnimatePresence mode="wait">
            {isSubmitting ? <motion.div key="loading" initial={{
            opacity: 0
          }} animate={{
            opacity: 1
          }} exit={{
            opacity: 0
          }}>
                <Loader2 className="animate-spin" size={20} />
              </motion.div> : isSent ? <motion.div key="sent" initial={{
            opacity: 0,
            scale: 0.5
          }} animate={{
            opacity: 1,
            scale: 1
          }} exit={{
            opacity: 0
          }} className="flex items-center gap-2">
                Message Sent! <CheckCircle2 size={18} />
              </motion.div> : <motion.div key="idle" initial={{
            opacity: 0
          }} animate={{
            opacity: 1
          }} exit={{
            opacity: 0
          }} className="flex items-center gap-2">
                Send Message <Send size={18} />
              </motion.div>}
          </AnimatePresence>
        </motion.button>
      </form>
    </GlassCard>;
}