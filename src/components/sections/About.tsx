"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MapPin, Mail, Clock, Globe, Phone } from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import SplitText from "@/components/ui/SplitText";
import AnimatedCounter from "@/components/ui/AnimatedCounter";
import { personalInfo, education } from "@/lib/data";

const detailItems = [
  { icon: MapPin, label: "Location", value: personalInfo.location },
  { icon: Mail, label: "Email", value: personalInfo.email },
  { icon: Phone, label: "Phone", value: personalInfo.phone },
  { icon: Clock, label: "Availability", value: personalInfo.availability },
  { icon: Globe, label: "Languages", value: personalInfo.languages },
];

const aboutText = [
  "I started in technical support managing over 1,000 servers, where I learned what it takes to keep production systems running reliably. That experience taught me to write code with operations in mind — clean, maintainable, and deployment-ready.",
  "Today I build full-stack web applications using React, Node.js, and Docker. I'm a recent Computer Engineering graduate from KMITL, and I'm always exploring the next thing to learn. I believe the best developers understand both what happens in the browser and what's happening behind the API.",
];

const statVariants = {
  hidden: { scale: 0.8, opacity: 0 },
  visible: (i: number) => ({
    scale: 1,
    opacity: 1,
    transition: { delay: i * 0.15, duration: 0.5 },
  }),
};

export default function About() {
  const statsRef = useRef(null);
  const statsInView = useInView(statsRef, { once: true, margin: "-60px" });

  return (
    <SectionWrapper id="about">
      <div className="mb-4">
        <span className="font-mono text-sm font-medium tracking-wider text-transparent bg-gradient-to-r from-accent-from to-accent-via bg-clip-text">
          ABOUT ME
        </span>
      </div>

      <div className="grid gap-12 lg:grid-cols-2">
        <div>
          <h2 className="mb-6 text-3xl font-bold md:text-4xl font-heading">
            <SplitText
              text="From servers to interfaces — building across the stack"
              type="words"
              staggerDelay={0.04}
            />
          </h2>

          <div className="space-y-4 text-text-secondary">
            {aboutText.map((paragraph, i) => (
              <motion.p
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.2, duration: 0.5 }}
              >
                {paragraph}
              </motion.p>
            ))}
          </div>

          <div className="mt-6">
            <h3 className="mb-3 text-sm font-semibold text-text-primary font-heading">
              Education
            </h3>
            {education.map((edu) => (
              <motion.div
                key={edu.degree}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="rounded-xl border border-card-border bg-card p-4 backdrop-blur-xl"
              >
                <p className="text-sm font-medium text-text-primary">
                  {edu.degree}
                </p>
                <p className="text-xs text-accent-via">{edu.school}</p>
                <p className="text-xs text-text-muted">{edu.duration}</p>
              </motion.div>
            ))}
          </div>

          <div className="mt-6 grid grid-cols-2 gap-4">
            {detailItems.map(({ icon: Icon, label, value }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 + i * 0.08, duration: 0.5 }}
                className="flex items-start gap-3 rounded-xl border border-card-border bg-card p-4 backdrop-blur-xl"
              >
                <Icon className="mt-0.5 h-5 w-5 shrink-0 text-accent-via" />
                <div>
                  <p className="text-xs text-text-muted">{label}</p>
                  <p className="text-sm font-medium text-text-primary">{value}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative mb-8"
          >
            <div className="h-48 w-48 rounded-full bg-gradient-to-br from-accent-from via-accent-via to-accent-to p-[3px] md:h-64 md:w-64">
              <div className="flex h-full w-full items-center justify-center rounded-full bg-bg text-5xl font-bold text-text-muted font-heading">
                RT
              </div>
            </div>
          </motion.div>

          <div ref={statsRef} className="flex w-full gap-4">
            {personalInfo.stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                custom={i}
                variants={statVariants}
                initial="hidden"
                animate={statsInView ? "visible" : "hidden"}
                className="flex flex-1 flex-col items-center rounded-xl border border-card-border bg-card p-4 backdrop-blur-xl"
              >
                <span className="bg-gradient-to-r from-accent-from via-accent-via to-accent-to bg-clip-text text-2xl font-bold text-transparent font-mono md:text-3xl">
                  {stat.value === "∞" ? (
                    "∞"
                  ) : (
                    <AnimatedCounter value={parseInt(stat.value)} suffix="+" />
                  )}
                </span>
                <span className="mt-1 text-center text-xs text-text-muted">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
