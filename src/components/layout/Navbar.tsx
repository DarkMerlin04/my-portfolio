"use client";

import { useStore } from "@/store/useStore";
import { NAV_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Menu, X, Download } from "lucide-react";
import ThemeToggle from "@/components/ui/ThemeToggle";
import Button from "@/components/ui/Button";

export default function Navbar() {
  const activeSection = useStore((s) => s.activeSection);
  const isNavVisible = useStore((s) => s.isNavVisible);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const handleNavClick = (href: string) => {
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
    setIsMobileOpen(false);
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isNavVisible ? "translate-y-0" : "-translate-y-full"
      )}
    >
      <div className="mx-auto max-w-6xl px-4">
        <nav
          className={cn(
            "mt-4 flex items-center justify-between rounded-2xl border border-card-border px-6 py-3 backdrop-blur-sm transition-colors",
            "bg-card"
          )}
          role="navigation"
          aria-label="Main navigation"
        >
          <button
            onClick={() => handleNavClick("#home")}
            className="bg-gradient-to-r from-accent-from via-accent-via to-accent-to bg-clip-text text-xl font-bold text-transparent font-heading"
          >
            Raweeroj Thokaeo
          </button>

          <div className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className={cn(
                  "relative rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                  "hover:text-text-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-via",
                  activeSection === link.href.slice(1)
                    ? "text-text-primary"
                    : "text-text-muted"
                )}
              >
                {link.label}
                {activeSection === link.href.slice(1) && (
                  <motion.div
                    layoutId="nav-indicator"
                    className="absolute bottom-0 left-2 right-2 h-[2px] bg-gradient-to-r from-accent-from to-accent-via"
                    transition={{ type: "spring" as const, stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Button
              variant="primary"
              size="sm"
              className="hidden md:inline-flex"
              onClick={() => window.open("/images/resume.pdf", "_blank")}
            >
              <Download className="mr-2 h-4 w-4" />
              Resume
            </Button>
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-surface md:hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-via"
              aria-label={isMobileOpen ? "Close menu" : "Open menu"}
            >
              {isMobileOpen ? (
                <X className="h-5 w-5 text-text-primary" />
              ) : (
                <Menu className="h-5 w-5 text-text-primary" />
              )}
            </button>
          </div>
        </nav>
      </div>

      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="mx-auto mt-2 max-w-6xl px-4"
          >
            <div className="rounded-2xl border border-card-border bg-card p-4 backdrop-blur-xl">
              {NAV_LINKS.map((link, i) => (
                <motion.button
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => handleNavClick(link.href)}
                  className={cn(
                    "w-full rounded-lg px-4 py-3 text-left text-sm font-medium transition-colors",
                    "hover:bg-surface focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-via",
                    activeSection === link.href.slice(1)
                      ? "text-text-primary"
                      : "text-text-muted"
                  )}
                >
                  {link.label}
                </motion.button>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: NAV_LINKS.length * 0.05 }}
                className="mt-2"
              >
                <Button
                  variant="primary"
                  size="sm"
                  className="w-full"
                  onClick={() => window.open("/images/resume.pdf", "_blank")}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download Resume
                </Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
