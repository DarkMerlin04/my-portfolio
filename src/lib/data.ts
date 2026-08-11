export const personalInfo = {
  name: "Raweeroj Thokaeo",
  role: "Full-Stack Developer",
  tagline: "Building digital solutions across the stack — from servers to interfaces",
  email: "raweeroj.tk@gmail.com",
  phone: "092-2574733",
  location: "Bangkok, Thailand",
  availability: "Open to junior full-stack opportunities",
  languages: "Thai (Native), English (TOEIC 570)",
  resumeUrl: "resume/Raweeroj_Thokaeo_Resume_EN.pdf",
  social: {
    github: "https://github.com/DarkMerlin04",
  },
  stats: [
    { value: "1+", label: "Years Building" },
    { value: "2", label: "Projects Shipped" },
    { value: "∞", label: "Always Learning" },
  ],
};

export const roles = [
  "Full-Stack Developer",
  "React & Next.js",
  "Node.js & Docker",
  "Problem Solver",
];

export const skills = [
  {
    category: "Frontend",
    items: [
      { name: "React", level: 80 },
      { name: "Next.js", level: 78 },
      { name: "Tailwind CSS", level: 85 },
      { name: "TypeScript", level: 75 },
      { name: "HTML & CSS", level: 88 },
    ],
  },
  {
    category: "Backend",
    items: [
      { name: "Node.js", level: 72 },
      { name: "Express.js", level: 70 },
      { name: "MongoDB", level: 68 },
      { name: "PostgreSQL", level: 65 },
      { name: "REST APIs", level: 75 },
    ],
  },
  {
    category: "DevOps & Tools",
    items: [
      { name: "Docker", level: 72 },
      { name: "Git & GitHub", level: 82 },
      { name: "Jenkins", level: 65 },
      { name: "Postman", level: 78 },
      { name: "Grafana", level: 70 },
    ],
  },
  {
    category: "Languages",
    items: [
      { name: "JavaScript", level: 80 },
      { name: "Python", level: 68 },
      { name: "Java", level: 62 },
      { name: "C / C#", level: 60 },
    ],
  },
];

export const experience = [
  {
    role: "Technical Support Outsource (AIS)",
    company: "Epic Consulting Co., Ltd.",
    duration: "May 2025 — Nov 2025",
    current: true,
    description: [
      "Managed, maintained, and administered over 1,000 servers, performing routine maintenance, service updates, and OS upgrades across legacy and new AIS services",
      "Coordinated cross-functionally with multiple teams to support seamless service deployment and ongoing maintenance",
      "Analyzed operational logs across 100+ services to identify root causes of bugs and abnormal system behaviors",
      "Monitored service performance using Grafana and Prometheus, and developed Shell Scripts to automate ingestion of text log data into Grafana dashboards",
    ],
    tech: ["Grafana", "Prometheus", "Shell Scripting", "Linux"],
  },
  {
    role: "Junior Full-Stack Developer Intern",
    company: "ClickNext Co., Ltd.",
    duration: "Apr 2024 — Jul 2024",
    current: false,
    description: [
      "Maintained and enhanced a legacy PHP-based web application originally built by a senior colleague, designed to manage residents across housing estates and condominiums",
      "Dockerized the existing codebase to streamline and simplify the deployment process",
      "Revamped the UI/UX in alignment with client requirements and updated specifications",
      "Integrated third-party APIs provided by the client's organization to enable seamless data recording within the existing system",
    ],
    tech: ["PHP", "Docker", "UI/UX", "REST APIs"],
  },
];

export const education = [
  {
    degree: "Bachelor of Engineering in Computer Engineering",
    school: "King Mongkut's Institute of Technology Ladkrabang",
    duration: "Aug 2021 — Apr 2025",
  },
];

export const projects = [
  {
    title: "Umi Design Sample",
    description:
      "A service landing page for a design studio offering custom banners, logos, and watermarks. Built with Next.js and Tailwind CSS, featuring service listings, pricing tables, portfolio gallery, and order workflow.",
    tags: ["Next.js", "Tailwind CSS", "TypeScript", "Responsive Design"],
    liveUrl: "https://darkmerlin04.github.io/umi-design-sample/",
    githubUrl: "https://github.com/DarkMerlin04/umi-design-sample",
    image: "/images/project-placeholder.svg",
    category: "frontend",
  },
];

export const projectCategories = [
  { value: "all", label: "All" },
  { value: "frontend", label: "Frontend" },
] as const;
