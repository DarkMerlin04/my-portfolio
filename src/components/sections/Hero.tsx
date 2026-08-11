"use client";

import { useEffect, useState, useCallback, useRef } from "react";
import { motion, useInView } from "framer-motion";
import dynamic from "next/dynamic";
import { ArrowDown, ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";
import MagneticButton from "@/components/ui/MagneticButton";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import { personalInfo, roles } from "@/lib/data";

const FloatingShapes = dynamic(
  () => import("@/components/three/FloatingShapes"),
  { ssr: false, loading: () => null }
);

function Typewriter({ words }: { words: string[] }) {
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[index];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && text === currentWord) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && text === "") {
      setIsDeleting(false);
      setIndex((i) => (i + 1) % words.length);
    } else {
      timeout = setTimeout(
        () => {
          setText(
            isDeleting
              ? currentWord.slice(0, text.length - 1)
              : currentWord.slice(0, text.length + 1)
          );
        },
        isDeleting ? 40 : 80
      );
    }

    return () => clearTimeout(timeout);
  }, [text, isDeleting, index, words]);

  return (
    <span className="bg-gradient-to-r from-accent-from via-accent-via to-accent-to bg-clip-text text-transparent">
      {text}
      <span className="animate-pulse">|</span>
    </span>
  );
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.03, delayChildren: 0.2 },
  },
};

const charVariants = {
  hidden: { opacity: 0, y: 40, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { type: "spring" as const, damping: 12, stiffness: 200 },
  },
};

export default function Hero() {
  const headline = personalInfo.name;
  const nameLines = headline.split(" ");
  const chars = nameLines.map((line) => Array.from(line));

  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: false, margin: "-200px" });

  const scrollToSection = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-4"
    >
      <div className="pointer-events-none absolute inset-0">
        {heroInView && <FloatingShapes />}
      </div>

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-bg" />

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-6"
        >
          <h1 className="text-5xl font-bold leading-tight md:text-7xl lg:text-8xl font-heading">
            {chars.map((lineChars, lineIndex) => (
              <span key={lineIndex} className="block">
                {lineChars.map((char, i) => (
                  <motion.span
                    key={i}
                    variants={charVariants}
                    className="inline-block"
                  >
                    {char}
                  </motion.span>
                ))}
              </span>
            ))}
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mx-auto mb-8 max-w-2xl text-lg text-text-secondary md:text-xl"
        >
          {personalInfo.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="mb-4"
        >
            <span className="text-text-muted font-mono text-sm">
              {personalInfo.role} —{" "}
            </span>
          <span className="font-mono text-lg font-medium">
            <Typewriter words={roles} />
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <MagneticButton>
            <Button
              variant="primary"
              size="lg"
              onClick={() => scrollToSection("projects")}
            >
              View My Work
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </MagneticButton>
          <MagneticButton>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => scrollToSection("contact")}
            >
              Get In Touch
            </Button>
          </MagneticButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.6 }}
          className="mt-12 flex items-center justify-center gap-8 font-mono text-sm text-text-muted"
        >
          {personalInfo.stats.map((stat, i) => (
            <div key={stat.label} className="flex flex-col items-center">
              <span className="text-2xl font-bold text-text-primary">
                {stat.value === "∞" ? (
                  "∞"
                ) : (
                  <AnimatedCounter value={parseInt(stat.value)} suffix="+" />
                )}
              </span>
              <span className="text-xs text-text-muted">{stat.label}</span>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{
          opacity: { delay: 2, duration: 0.6 },
          y: { delay: 2, duration: 2, repeat: Infinity },
        }}
        onClick={() => scrollToSection("about")}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-text-muted transition-colors hover:text-text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-via rounded-full p-2"
        aria-label="Scroll to about section"
      >
        <ArrowDown className="h-6 w-6" />
      </motion.button>
    </section>
  );
}
