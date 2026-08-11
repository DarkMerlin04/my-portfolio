"use client";

import { motion } from "framer-motion";
import {
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiTypescript,
  SiHtml5,
  SiCss,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiDocker,
  SiGithub,
  SiJenkins,
  SiPostman,
  SiGrafana,
  SiJavascript,
  SiPython,
  SiOpenjdk,
  SiDotnet,
} from "react-icons/si";
import type { IconType } from "react-icons";
import { Braces } from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import { skills } from "@/lib/data";

const iconMap: Record<string, IconType | typeof Braces> = {
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiTypescript,
  SiHtml5,
  SiCss,
  SiNodedotjs,
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiDocker,
  SiGithub,
  SiJenkins,
  SiPostman,
  SiGrafana,
  SiJavascript,
  SiPython,
  SiOpenjdk,
  SiDotnet,
  Braces,
};

function SkillLogo({
  name,
  icon,
  index,
}: {
  name: string;
  icon: string;
  index: number;
}) {
  const Icon = iconMap[icon];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      className="flex items-center justify-center"
    >
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{
          duration: 4 + (index % 3),
          repeat: Infinity,
          ease: "easeInOut",
          delay: (index % 4) * 0.7,
        }}
        whileHover={{ scale: 1.08 }}
        className="group flex flex-col items-center gap-3 rounded-2xl border border-card-border bg-card px-4 py-6 backdrop-blur-xl will-change-transform transition-colors hover:border-accent-via/60 hover:bg-surface"
      >
        <Icon className="h-10 w-10 shrink-0 transition-transform duration-300 group-hover:scale-110" />
        <span className="text-center text-sm font-medium text-text-primary">
          {name}
        </span>
        <span className="absolute inset-x-6 bottom-0 h-px bg-gradient-to-r from-transparent via-accent-via/0 to-transparent transition-all duration-300 group-hover:via-accent-via/60" />
      </motion.div>
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
            <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 lg:grid-cols-5">
              {category.items.map((skill, i) => (
                <SkillLogo
                  key={skill.name}
                  name={skill.name}
                  icon={skill.icon}
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
