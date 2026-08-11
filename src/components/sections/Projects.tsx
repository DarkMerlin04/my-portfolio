"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink } from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { projects, projectCategories } from "@/lib/data";
import { cn } from "@/lib/utils";

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filtered =
    activeCategory === "all"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <SectionWrapper id="projects">
      <div className="mb-4 text-center">
        <span className="font-mono text-sm font-medium tracking-wider text-transparent bg-gradient-to-r from-accent-from to-accent-via bg-clip-text">
          PROJECTS
        </span>
      </div>

      <h2 className="mb-4 text-center text-3xl font-bold md:text-4xl font-heading">
        Projects I've built
      </h2>
      <p className="mx-auto mb-8 max-w-xl text-center text-text-secondary">
        A project I built while learning and growing as a developer.
      </p>

      <div className="mb-10 flex flex-wrap items-center justify-center gap-2">
        {projectCategories.map((cat) => (
          <button
            key={cat.value}
            onClick={() => setActiveCategory(cat.value)}
            className={cn(
              "rounded-full px-5 py-2 text-sm font-medium transition-all duration-200",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-via",
              activeCategory === cat.value
                ? "bg-gradient-to-r from-accent-from via-accent-via to-accent-to text-white"
                : "border border-card-border bg-transparent text-text-secondary hover:bg-surface hover:text-text-primary"
            )}
          >
            {cat.label}
          </button>
        ))}
      </div>

      <motion.div layout className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map((project, i) => (
            <motion.article
              key={project.title}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{
                duration: 0.4,
                delay: i * 0.05,
                ease: [0.25, 0.1, 0.25, 1] as const,
              }}
              className="group relative overflow-hidden rounded-2xl border border-card-border bg-card backdrop-blur-xl"
            >
              <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-accent-from/20 via-accent-via/20 to-accent-to/20" />
                <div className="flex h-full items-center justify-center">
                  <span className="text-4xl font-bold text-text-muted/30 font-heading">
                    {project.title.charAt(0)}
                  </span>
                </div>
                <div className="absolute inset-0 flex items-center justify-center gap-4 bg-bg/60 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-white p-3 text-bg transition-transform hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-via"
                    aria-label={`View ${project.title} live`}
                  >
                    <ExternalLink className="h-5 w-5" />
                  </a>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-full bg-white p-3 text-bg transition-transform hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-via"
                    aria-label={`View ${project.title} on GitHub`}
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  </a>
                </div>
              </div>

              <div className="p-5">
                <h3 className="mb-2 text-lg font-semibold text-text-primary font-heading">
                  {project.title}
                </h3>
                <p className="mb-4 text-sm text-text-secondary line-clamp-2">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-card-border px-2.5 py-0.5 font-mono text-xs text-text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>
    </SectionWrapper>
  );
}
