"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface SplitTextProps {
  text: string;
  type?: "chars" | "words";
  delay?: number;
  staggerDelay?: number;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "span" | "p";
}

export default function SplitText({
  text,
  type = "chars",
  delay = 0,
  staggerDelay = 0.03,
  className,
  as: Tag = "span",
}: SplitTextProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  const items = type === "chars" ? Array.from(text) : text.split(" ");

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: staggerDelay, delayChildren: delay },
    },
  };

  const child = {
    hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
    visible: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={container}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={cn("inline-flex flex-wrap", className)}
      aria-label={text}
    >
      {items.map((item, i) => (
        <motion.span
          key={`${item}-${i}`}
          variants={child}
          className="inline-block"
          style={{ whiteSpace: type === "chars" && item === " " ? "pre" : "normal" }}
        >
          {type === "words" && i > 0 ? "\u00A0" : ""}
          {item}
          {type === "words" ? "" : ""}
        </motion.span>
      ))}
    </motion.div>
  );
}
