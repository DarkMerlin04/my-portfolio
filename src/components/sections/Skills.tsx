"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { skills } from "@/lib/data";

function SkillBar({ name, level, index }: { name: string; level: number; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      className="group"
    >
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm font-medium text-text-primary">{name}</span>
        <span className="font-mono text-xs text-text-muted">{level}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-surface">
        <motion.div
          initial={{ width: 0 }}
          animate={isInView ? { width: `${level}%` } : { width: 0 }}
          transition={{
            delay: index * 0.08 + 0.2,
            duration: 0.8,
            ease: [0.25, 0.1, 0.25, 1] as const,
          }}
          className="h-full rounded-full bg-gradient-to-r from-accent-from via-accent-via to-accent-to opacity-80 group-hover:opacity-100 transition-opacity"
        />
      </div>
    </motion.div>
  );
}

export default function Skills() {
  return (
    <SectionWrapper id="skills">
      <div className="mb-4 text-center">
        <span className="font-mono text-sm font-medium tracking-wider text-transparent bg-gradient-to-r from-accent-from to-accent-via bg-clip-text">
          TECH STACK
        </span>
      </div>

      <h2 className="mb-4 text-center text-3xl font-bold md:text-4xl font-heading">
        Tools & technologies I work with
      </h2>
      <p className="mx-auto mb-12 max-w-xl text-center text-text-secondary">
        A curated set of tools I use daily to build modern, scalable web applications.
      </p>

      <div className="grid gap-8 md:grid-cols-2">
        {skills.map((category, ci) => (
          <motion.div
            key={category.category}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: ci * 0.15, duration: 0.5 }}
            className="rounded-2xl border border-card-border bg-card p-6 backdrop-blur-xl"
          >
            <h3 className="mb-6 text-lg font-semibold text-text-primary font-heading">
              {category.category}
            </h3>
            <div className="space-y-4">
              {category.items.map((skill, i) => (
                <SkillBar
                  key={skill.name}
                  name={skill.name}
                  level={skill.level}
                  index={i}
                />
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
