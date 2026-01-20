import React, { useRef, Children } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import {
  Code2,
  Palette,
  Terminal,
  Cpu,
  Globe,
  Database,
  Mail,
  ChevronDown,
  ArrowUpRight,
} from "lucide-react";
import { GlassCard } from "./components/GlassCard";
import { ProjectCard } from "./components/ProjectCard";
import { SkillBadge } from "./components/SkillBadge";
import { ContactForm } from "./components/ContactForm";
import { Navbar } from "./components/Navbar";
export function App() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });
  // Parallax effects
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 500], [0, 200]);
  const heroOpacity = useTransform(scrollY, [0, 300], [1, 0]);
  const projects = [
    {
      title: "Neon Finance Dashboard",
      description:
        "A real-time cryptocurrency tracking dashboard featuring live market data, interactive charts, and portfolio management tools. Built with high-performance rendering in mind.",
      tags: ["React", "TypeScript", "D3.js", "WebSocket"],
      image:
        "https://images.unsplash.com/photo-1642104704074-907c0698cbd9?auto=format&fit=crop&q=80&w=1000",
    },
    {
      title: "AI Image Generator",
      description:
        "SaaS application leveraging Stable Diffusion for generating custom artwork. Includes user authentication, credit system, and gallery showcase.",
      tags: ["Next.js", "Python", "Stripe", "PostgreSQL"],
      image:
        "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1000",
    },
    {
      title: "EcoTrack Mobile App",
      description:
        "Cross-platform mobile application for tracking carbon footprint. Gamified experience with social features and daily challenges.",
      tags: ["React Native", "Firebase", "Redux", "Node.js"],
      image:
        "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1000",
    },
  ];
  const skills = [
    {
      name: "React / Next.js",
      icon: <Code2 size={16} />,
    },
    {
      name: "TypeScript",
      icon: <Terminal size={16} />,
    },
    {
      name: "Tailwind CSS",
      icon: <Palette size={16} />,
    },
    {
      name: "Node.js",
      icon: <Cpu size={16} />,
    },
    {
      name: "PostgreSQL",
      icon: <Database size={16} />,
    },
    {
      name: "Three.js",
      icon: <Globe size={16} />,
    },
  ];
  // Text reveal animation variants
  const containerVariants = {
    hidden: {
      opacity: 0,
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };
  const itemVariants = {
    hidden: {
      y: 20,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };
  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-teal-800 text-white selection:bg-neon-purple/30 selection:text-white overflow-x-hidden"
    >
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-neon-cyan to-neon-purple origin-left z-[100]"
        style={{
          scaleX,
        }}
      />

      {/* Fixed Background Elements */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-slate-950 to-black" />
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-neon-purple/20 blur-[120px] animate-blob" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-neon-cyan/20 blur-[120px] animate-blob animation-delay-2000" />
        <div className="absolute top-[40%] left-[40%] w-[30%] h-[30%] rounded-full bg-blue-600/10 blur-[100px] animate-blob animation-delay-4000" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay" />

        {/* Floating Particles */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/10"
            style={{
              width: Math.random() * 4 + 1,
              height: Math.random() * 4 + 1,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      <Navbar />

      {/* Main Content */}
      <main className="relative z-10 px-6 py-12 md:px-12 lg:px-24 max-w-7xl mx-auto pt-24">
        {/* Hero Section */}
        <section
          id="hero"
          className="min-h-[90vh] flex flex-col justify-center mb-32 pt-12 relative"
        >
          <motion.div
            style={{
              y: heroY,
              opacity: heroOpacity,
            }}
            className="max-w-4xl"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants}>
              <div className="inline-block px-4 py-2 mb-6 rounded-full bg-white/5 border border-white/10 backdrop-blur-md text-neon-cyan text-sm font-medium tracking-wide relative overflow-hidden group">
                <span className="relative z-10">
                  AVAILABLE FOR FREELANCE WORK
                </span>
                <motion.div
                  className="absolute inset-0 bg-neon-cyan/10"
                  animate={{
                    x: ["-100%", "100%"],
                  }}
                  // transition={{
                  //   repeat: Infinity,
                  //   duration: 8,
                  //   ease: "linear",
                  // }}
                />
              </div>
            </motion.div>

            <motion.h1
              variants={itemVariants}
              className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-8 leading-tight"
            >
              Crafting digital <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-neon-cyan via-blue-500 to-neon-purple animate-gradient-x bg-[length:200%_auto]">
                experiences
              </span>{" "}
              with <br />
              purpose & precision.
            </motion.h1>

            <motion.p
              variants={itemVariants}
              className="text-xl text-gray-400 max-w-2xl mb-12 leading-relaxed"
            >
              I'm Alex Morgan, a Full Stack Developer specializing in building
              exceptional digital products. I blend technical expertise with
              design sensibilities to create software that feels alive.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-wrap gap-4"
            >
              <motion.button
                whileHover={{
                  scale: 1.05,
                }}
                whileTap={{
                  scale: 0.95,
                }}
                onClick={() =>
                  document.getElementById("projects")?.scrollIntoView({
                    behavior: "smooth",
                  })
                }
                className="px-8 py-4 rounded-full bg-white text-black font-bold hover:bg-gray-200 transition-colors"
              >
                View Projects
              </motion.button>
              <motion.button
                whileHover={{
                  scale: 1.05,
                  backgroundColor: "rgba(255,255,255,0.15)",
                }}
                whileTap={{
                  scale: 0.95,
                }}
                onClick={() =>
                  document.getElementById("contact")?.scrollIntoView({
                    behavior: "smooth",
                  })
                }
                className="px-8 py-4 rounded-full bg-white/10 border border-white/10 text-white font-bold backdrop-blur-md transition-all"
              >
                Contact Me
              </motion.button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
              y: [0, 10, 0],
            }}
            transition={{
              delay: 2,
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute bottom-12 left-1/2 -translate-x-1/2 text-gray-500 cursor-pointer"
            onClick={() =>
              document.getElementById("skills")?.scrollIntoView({
                behavior: "smooth",
              })
            }
          >
            <ChevronDown size={24} />
          </motion.div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="mb-32 scroll-mt-24">
          <div className="flex flex-col md:flex-row gap-12 items-start">
            <motion.div
              initial={{
                opacity: 0,
                x: -50,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: true,
                margin: "-100px",
              }}
              transition={{
                duration: 0.8,
              }}
              className="md:w-1/3"
            >
              <h2 className="text-3xl font-bold mb-4">
                Technical <span className="text-neon-purple">Arsenal</span>
              </h2>
              <p className="text-gray-400">
                A curated stack of technologies I use to bring ideas to life.
                Always exploring new tools to improve performance and user
                experience.
              </p>
            </motion.div>
            <div className="md:w-2/3 flex flex-wrap gap-3">
              {skills.map((skill, index) => (
                <SkillBadge key={skill.name} {...skill} index={index} />
              ))}
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="mb-32 scroll-mt-24">
          <motion.div
            initial={{
              opacity: 0,
              y: 30,
            }}
            whileInView={{
              opacity: 1,
              y: 0,
            }}
            viewport={{
              once: true,
            }}
            transition={{
              duration: 0.6,
            }}
            className="flex justify-between items-end mb-12"
          >
            <div>
              <h2 className="text-4xl font-bold mb-2">
                Selected <span className="text-neon-cyan">Works</span>
              </h2>
              <p className="text-gray-400">
                A showcase of recent technical challenges and solutions.
              </p>
            </div>
            <motion.a
              href="#"
              whileHover={{
                x: 5,
              }}
              className="hidden md:flex items-center gap-2 text-neon-cyan hover:text-white transition-colors"
            >
              View all projects <ArrowUpRight size={16} />
            </motion.a>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, index) => (
              <ProjectCard key={project.title} {...project} index={index} />
            ))}
          </div>

          <div className="mt-8 md:hidden text-center">
            <a
              href="#"
              className="inline-flex items-center gap-2 text-neon-cyan hover:text-white transition-colors"
            >
              View all projects <ArrowUpRight size={16} />
            </a>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="mb-24 scroll-mt-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{
                opacity: 0,
                x: -50,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.8,
              }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Let's build something <br />
                extraordinary <span className="text-neon-purple">together</span>
                .
              </h2>
              <p className="text-xl text-gray-400 mb-8">
                Currently open for new opportunities and collaborations. Whether
                you have a question or just want to say hi, I'll try my best to
                get back to you!
              </p>

              <div className="space-y-4">
                <motion.a
                  href="mailto:hello@alexmorgan.dev"
                  whileHover={{
                    scale: 1.02,
                    x: 10,
                  }}
                  className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-colors group"
                >
                  <div className="p-3 rounded-full bg-neon-purple/20 text-neon-purple group-hover:scale-110 transition-transform">
                    <Mail size={24} />
                  </div>
                  <div>
                    <div className="text-sm text-gray-400">Email Me</div>
                    <div className="text-lg font-medium">
                      hello@alexmorgan.dev
                    </div>
                  </div>
                </motion.a>
              </div>
            </motion.div>

            <motion.div
              initial={{
                opacity: 0,
                x: 50,
              }}
              whileInView={{
                opacity: 1,
                x: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                duration: 0.8,
                delay: 0.2,
              }}
            >
              <ContactForm />
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/10 pt-8 pb-12 text-center text-gray-500 text-sm">
          <p>© 2025 Alex Morgan. Built with React, Tailwind & Framer Motion.</p>
        </footer>
      </main>
    </div>
  );
}
