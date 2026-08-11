"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { experience } from "@/lib/data";

function TimelineCard({
  exp,
  index,
}: {
  exp: (typeof experience)[0];
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const isLeft = index % 2 === 0;

  return (
    <div
      ref={ref}
      className={`relative flex items-start gap-8 ${
        isLeft ? "md:flex-row" : "md:flex-row-reverse"
      }`}
    >
      <div className={`hidden flex-1 md:block ${isLeft ? "text-right" : "text-left"}`}>
        <motion.div
          initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: isLeft ? -30 : 30 }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const }}
          className="rounded-2xl border border-card-border bg-card p-6 backdrop-blur-xl"
        >
          <div className="mb-1 flex items-center gap-3 flex-wrap">
            <span className="font-mono text-xs text-text-muted">{exp.duration}</span>
            {exp.current && (
              <span className="rounded-full bg-accent-from/10 px-2.5 py-0.5 font-mono text-xs text-accent-from">
                NOW
              </span>
            )}
          </div>
          <h3 className="text-lg font-semibold text-text-primary font-heading">
            {exp.role}
          </h3>
          <p className="mb-3 text-sm text-accent-via">{exp.company}</p>
          <ul className="space-y-2">
            {exp.description.map((item, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.4 }}
                className="flex items-start gap-2 text-sm text-text-secondary"
              >
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent-via" />
                {item}
              </motion.li>
            ))}
          </ul>
          <div className="mt-4 flex flex-wrap gap-2">
            {exp.tech.map((t) => (
              <span
                key={t}
                className="rounded-full border border-card-border px-3 py-1 font-mono text-xs text-text-muted transition-colors hover:border-accent-via hover:text-accent-via"
              >
                {t}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="flex flex-col items-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : { scale: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          className={`z-10 h-4 w-4 rounded-full border-2 ${
            exp.current
              ? "border-accent-via bg-accent-via shadow-[0_0_12px_rgba(139,92,246,0.4)]"
              : "border-accent-from/50 bg-bg"
          }`}
        />
        <div className="w-px flex-1 bg-gradient-to-b from-accent-from/30 to-accent-to/30" />
      </div>

      <div className={`flex-1 md:hidden`}>
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const }}
          className="rounded-2xl border border-card-border bg-card p-6 backdrop-blur-xl"
        >
          <div className="mb-1 flex items-center gap-3 flex-wrap">
            <span className="font-mono text-xs text-text-muted">{exp.duration}</span>
            {exp.current && (
              <span className="rounded-full bg-accent-from/10 px-2.5 py-0.5 font-mono text-xs text-accent-from">
                NOW
              </span>
            )}
          </div>
          <h3 className="text-lg font-semibold text-text-primary font-heading">
            {exp.role}
          </h3>
          <p className="mb-3 text-sm text-accent-via">{exp.company}</p>
          <ul className="space-y-2">
            {exp.description.map((item, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.4 }}
                className="flex items-start gap-2 text-sm text-text-secondary"
              >
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent-via" />
                {item}
              </motion.li>
            ))}
          </ul>
          <div className="mt-4 flex flex-wrap gap-2">
            {exp.tech.map((t) => (
              <span
                key={t}
                className="rounded-full border border-card-border px-3 py-1 font-mono text-xs text-text-muted transition-colors hover:border-accent-via hover:text-accent-via"
              >
                {t}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default function Experience() {
  return (
    <SectionWrapper id="experience">
      <div className="mb-4 text-center">
        <span className="font-mono text-sm font-medium tracking-wider text-transparent bg-gradient-to-r from-accent-from to-accent-via bg-clip-text">
          EXPERIENCE
        </span>
      </div>

      <h2 className="mb-4 text-center text-3xl font-bold md:text-4xl font-heading">
        Professional journey
      </h2>
      <p className="mx-auto mb-16 max-w-xl text-center text-text-secondary">
        A track record of delivering impact across companies of all sizes.
      </p>

      <div className="relative mx-auto max-w-4xl">
        <div className="absolute left-[23px] top-0 bottom-0 hidden md:block md:left-1/2 md:-translate-x-px">
          <div className="h-full w-px bg-gradient-to-b from-accent-from/30 via-accent-via/30 to-accent-to/30" />
        </div>

        <div className="space-y-12">
          {experience.map((exp, i) => (
            <TimelineCard key={exp.company + exp.role} exp={exp} index={i} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
