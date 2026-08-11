"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, MapPin, Phone, Send, CheckCircle } from "lucide-react";
import SectionWrapper from "@/components/ui/SectionWrapper";
import Button from "@/components/ui/Button";
import { personalInfo } from "@/lib/data";
import { SOCIAL_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  subject: z.string().min(3, "Subject must be at least 3 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormData = z.infer<typeof formSchema>;

const contactInfo = [
  { icon: Mail, label: "Email", value: personalInfo.email },
  { icon: Phone, label: "Phone", value: personalInfo.phone },
  { icon: MapPin, label: "Location", value: personalInfo.location },
];

const GitHubIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

const socialLinks = [
  { href: SOCIAL_LINKS.github, icon: GitHubIcon, label: "GitHub" },
];

export default function Contact() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: FormData) => {
    const subject = encodeURIComponent(`[Portfolio] ${data.subject}`);
    const body = encodeURIComponent(
      `Name: ${data.name}\nEmail: ${data.email}\n\n${data.message}`
    );
    window.location.href = `mailto:${personalInfo.email}?subject=${subject}&body=${body}`;
    setIsSubmitted(true);
    reset();
    setTimeout(() => setIsSubmitted(false), 5000);
  };

  return (
    <SectionWrapper id="contact">
      <div className="mb-4 text-center">
        <span className="font-mono text-sm font-medium tracking-wider text-transparent bg-gradient-to-r from-accent-from to-accent-via bg-clip-text">
          CONTACT
        </span>
      </div>

      <h2 className="mb-4 text-center text-3xl font-bold md:text-4xl font-heading">
        Let&apos;s work together
      </h2>
      <p className="mx-auto mb-12 max-w-xl text-center text-text-secondary">
        Have a project in mind or just want to say hi? I&apos;d love to hear from you.
      </p>

      <div className="grid gap-8 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit(onSubmit)}
            className="rounded-2xl border border-card-border bg-card p-6 backdrop-blur-xl md:p-8"
          >
            <div className="mb-6 grid gap-6 md:grid-cols-2">
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-text-primary"
                >
                  Name
                </label>
                <input
                  id="name"
                  {...register("name")}
                  placeholder="Your name"
                  className={cn(
                    "w-full rounded-xl border bg-surface px-4 py-3 text-sm text-text-primary outline-none transition-all",
                    "placeholder:text-text-muted focus:border-accent-via focus:ring-1 focus:ring-accent-via",
                    errors.name ? "border-red-500" : "border-card-border"
                  )}
                />
                {errors.name && (
                  <p className="mt-1 text-xs text-red-400">{errors.name.message}</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-text-primary"
                >
                  Email
                </label>
                <input
                  id="email"
                  {...register("email")}
                  placeholder="your@email.com"
                  className={cn(
                    "w-full rounded-xl border bg-surface px-4 py-3 text-sm text-text-primary outline-none transition-all",
                    "placeholder:text-text-muted focus:border-accent-via focus:ring-1 focus:ring-accent-via",
                    errors.email ? "border-red-500" : "border-card-border"
                  )}
                />
                {errors.email && (
                  <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>
                )}
              </div>
            </div>

            <div className="mb-6">
              <label
                htmlFor="subject"
                className="mb-2 block text-sm font-medium text-text-primary"
              >
                Subject
              </label>
              <input
                id="subject"
                {...register("subject")}
                placeholder="What's this about?"
                className={cn(
                  "w-full rounded-xl border bg-surface px-4 py-3 text-sm text-text-primary outline-none transition-all",
                  "placeholder:text-text-muted focus:border-accent-via focus:ring-1 focus:ring-accent-via",
                  errors.subject ? "border-red-500" : "border-card-border"
                )}
              />
              {errors.subject && (
                <p className="mt-1 text-xs text-red-400">{errors.subject.message}</p>
              )}
            </div>

            <div className="mb-6">
              <label
                htmlFor="message"
                className="mb-2 block text-sm font-medium text-text-primary"
              >
                Message
              </label>
              <textarea
                id="message"
                {...register("message")}
                rows={5}
                placeholder="Tell me about your project..."
                className={cn(
                  "w-full rounded-xl border bg-surface px-4 py-3 text-sm text-text-primary outline-none transition-all resize-none",
                  "placeholder:text-text-muted focus:border-accent-via focus:ring-1 focus:ring-accent-via",
                  errors.message ? "border-red-500" : "border-card-border"
                )}
              />
              {errors.message && (
                <p className="mt-1 text-xs text-red-400">{errors.message.message}</p>
              )}
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              className="w-full"
            >
              {isSubmitted ? (
                <>
                  <CheckCircle className="mr-2 h-5 w-5" />
                  Check your email app!
                </>
              ) : (
                <>
                  <Send className="mr-2 h-5 w-5" />
                  Send Message
                </>
              )}
            </Button>
          </motion.form>
        </div>

        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex h-full flex-col justify-center gap-6"
          >
            <div className="mb-4">
              <div className="flex items-center gap-3">
                <span className="relative flex h-3 w-3">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-green-500" />
                </span>
                <span className="text-sm font-medium text-text-primary">
                  {personalInfo.availability}
                </span>
              </div>
            </div>

            {contactInfo.map(({ icon: Icon, label, value }) => (
              <div
                key={label}
                className="flex items-center gap-4 rounded-xl border border-card-border bg-card p-4 backdrop-blur-xl"
              >
                <Icon className="h-5 w-5 shrink-0 text-accent-via" />
                <div>
                  <p className="text-xs text-text-muted">{label}</p>
                  <p className="text-sm font-medium text-text-primary">{value}</p>
                </div>
              </div>
            ))}

            <div className="mt-4">
              <p className="mb-4 text-sm text-text-muted">Find me on</p>
              <div className="flex gap-3">
                {socialLinks.map(({ href, icon: Icon, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-xl border border-card-border bg-card p-3 text-text-muted backdrop-blur-xl transition-all hover:border-accent-via hover:text-accent-via focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-via"
                    aria-label={label}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </SectionWrapper>
  );
}
