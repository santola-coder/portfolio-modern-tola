import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Twitter, Menu, X, FacebookIcon } from "lucide-react";
export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  const scrollToSection = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
      });
    }
  };
  const navLinks = [
    {
      name: "About",
      id: "hero",
    },
    {
      name: "Skills",
      id: "skills",
    },
    {
      name: "Projects",
      id: "projects",
    },
    {
      name: "Contact",
      id: "contact",
    },
  ];
  return (
    <>
      <motion.nav
        initial={{
          y: -100,
        }}
        animate={{
          y: 0,
        }}
        transition={{
          duration: 0.5,
        }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${isScrolled ? "bg-black/50 backdrop-blur-xl border-white/10 py-4 shadow-lg shadow-black/20" : "bg-transparent border-transparent py-6"}`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 flex justify-between items-center">
          {/* Logo */}
          <div
            className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 cursor-pointer"
            onClick={() => scrollToSection("hero")}
          >
            Tola Coder<span className="text-neon-cyan">.</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => scrollToSection(link.id)}
                className="text-sm font-medium text-gray-300 hover:text-white transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-neon-cyan transition-all group-hover:w-full" />
              </button>
            ))}
          </div>

          {/* Social Icons (Desktop) */}
          <div className="hidden md:flex items-center gap-6">
            <a
              href="https://github.com/santola-coder"
              className="text-gray-400 hover:text-white transition-colors hover:scale-110 transform duration-200"
            >
              <Github size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/tola-san-969039312/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app"
              className="text-gray-400 hover:text-white transition-colors hover:scale-110 transform duration-200"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="https://web.facebook.com/Tola.SanST/"
              className="text-gray-400 hover:text-white transition-colors hover:scale-110 transform duration-200"
            >
              <FacebookIcon size={20} />
            </a>
           
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white p-2"
            onClick={() => setIsMobileMenuOpen(true)}
          >
            <Menu size={24} />
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{
              opacity: 0,
              x: "100%",
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            exit={{
              opacity: 0,
              x: "100%",
            }}
            transition={{
              type: "spring",
              damping: 25,
              stiffness: 200,
            }}
            className="fixed inset-0 z-[60] md:hidden bg-black/60 backdrop-blur-2xl border-l border-white/10"
          >
            <div className="flex flex-col h-full p-8">
              <div className="flex justify-end mb-12">
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-white hover:text-neon-cyan transition-colors"
                >
                  <X size={32} />
                </button>
              </div>

              <div className="flex flex-col gap-8 items-center justify-center flex-1">
                {navLinks.map((link, index) => (
                  <motion.button
                    key={link.name}
                    initial={{
                      opacity: 0,
                      y: 20,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      delay: index * 0.1,
                    }}
                    onClick={() => scrollToSection(link.id)}
                    className="text-3xl font-bold text-white hover:text-neon-cyan transition-colors"
                  >
                    {link.name}
                  </motion.button>
                ))}
              </div>

              <div className="flex justify-center gap-8 mt-auto pb-8">
                <a
                  href="https://github.com"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Github size={24} />
                </a>
                <a
                  href="https://linkedin.com"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Linkedin size={24} />
                </a>
                <a
                  href="https://twitter.com"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <Twitter size={24} />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
