export interface ExperienceProject {
  name: string;
  description: string;
  techStack: string[];
  highlights: string[];
}

export interface Experience {
  id: string;
  company: string;
  location: string;
  role: string;
  period: string;
  type: "tech" | "creative" | "both";
  techDescription: string;
  creativeDescription: string;
  projects: ExperienceProject[];
  certLink?: string;
}

export const experiences: Experience[] = [
  {
    id: "anf-labs",
    company: "ANF Labs",
    location: "Dubai, UAE",
    role: "Software Engineer",
    period: "February 2026 - Present",
    type: "both",
    techDescription:
      "Built a multi-platform enterprise ecosystem from the ground up — 4 native apps, shared Supabase backend, edge functions, and automated tooling.",
    creativeDescription:
      "Crafted the 'Obsidian Glass' design system — glassmorphism, aurora gradients, and haptic-driven animations across every platform.",
    projects: [
      {
        name: "ANFlo",
        description:
          "Enterprise HR management app across iOS, Android, PWA, and macOS with offline-first sync and real-time subscriptions.",
        techStack: [
          "Swift",
          "SwiftUI",
          "Kotlin",
          "Jetpack Compose",
          "Next.js",
          "React",
          "Supabase",
          "PostgreSQL",
        ],
        highlights: [
          "4 native platforms with shared Supabase backend",
          "13 database tables, 3 edge functions, 3 storage buckets",
          "Offline-first architecture with server-wins conflict resolution",
          "Obsidian Glass design system with glassmorphism",
          "Productivity scoring algorithm with real-time leaderboards",
          "24 notification types with WhatsApp integration",
        ],
      },
      {
        name: "ANFlux",
        description:
          "Sales analytics dashboard for upper management with multi-dimensional data visualization.",
        techStack: [
          "React",
          "Vite",
          "Recharts",
          "SwiftUI",
          "Kotlin",
          "Jetpack Compose",
          "Supabase",
        ],
        highlights: [
          "Sales aggregation by brand, territory, store, and period",
          "Interactive charts with PDF/CSV export",
          "Cross-platform: Web, iOS, and Android",
        ],
      },
      {
        name: "CLEO",
        description:
          "Terminal UI application for bulk-updating Shopify order tracking from FedEx and ShipBob CSVs.",
        techStack: ["Python", "Textual", "httpx", "Shopify API"],
        highlights: [
          "Async Shopify REST API client with leaky-bucket rate limiting",
          "Beautiful TUI with real-time progress and logging",
          "Resume capability with persistent progress tracking",
        ],
      },
      {
        name: "Daily Update Bot",
        description:
          "WhatsApp bot that generates formatted team status reports using Claude CLI.",
        techStack: ["Node.js", "Baileys", "Claude CLI"],
        highlights: [
          "Automated diary parsing and status message generation",
          "Claude AI integration for intelligent report formatting",
          "Draft approval workflow for team updates",
        ],
      },
    ],
  },
  {
    id: "iqvia",
    company: "IQVIA",
    location: "Bangalore, India",
    role: "Data Analyst Intern",
    period: "April - December 2025",
    type: "tech",
    techDescription:
      "Supporting GSK Pharmaceuticals with data preparation, dashboard automation, and Python-driven reporting pipelines.",
    creativeDescription:
      "Turning pharmaceutical data into clear visual stories through dashboards and automated reports.",
    projects: [
      {
        name: "GSK Data Analytics",
        description:
          "Data analysis and automation for GSK Pharmaceuticals' key metrics and insights.",
        techStack: ["Excel", "Power BI", "Python", "Data Governance"],
        highlights: [
          "Maintained dashboards tracking key pharmaceutical metrics",
          "Created Python scripts for data accuracy and automation",
          "Gained expertise in pharma operations and data governance",
        ],
      },
    ],
    certLink: "#",
  },
  {
    id: "mafkin",
    company: "Mafkin Robotics",
    location: "India",
    role: "Media Intern",
    period: "June - September 2024",
    type: "creative",
    techDescription:
      "Applied 3D modeling and motion graphics skills to produce investor-facing media content.",
    creativeDescription:
      "Designed posts, edited cinematic videos, rendered 3D models and animations for LinkedIn campaigns and investor presentations.",
    projects: [
      {
        name: "Media Production",
        description:
          "End-to-end media production for LinkedIn and investor communications.",
        techStack: [
          "Blender",
          "DaVinci Resolve",
          "Adobe Illustrator",
          "Affinity Publisher",
        ],
        highlights: [
          "3D model rendering and animation for product showcases",
          "Video editing for LinkedIn posts and investor meets",
          "Led and guided a team of video editors",
        ],
      },
    ],
    certLink: "#",
  },
  {
    id: "tech-mahindra",
    company: "Tech Mahindra",
    location: "Bangalore, India",
    role: "Project Intern",
    period: "August - October 2023",
    type: "tech",
    techDescription:
      "Developed an AI-powered recruitment automation system with NLP resume parsing and speech analysis.",
    creativeDescription:
      "Designed intuitive UIs for complex AI workflows — making recruitment automation feel effortless.",
    projects: [
      {
        name: "Recruitment Automation",
        description:
          "NLP-based system for automated resume parsing, candidate selection, and interview scheduling.",
        techStack: ["Python", "NLP", "Speech Analysis API", "UI/UX"],
        highlights: [
          "NLP-powered resume parsing and candidate matching",
          "AI-based interview scheduling system",
          "Speech analysis API integration for interview evaluation",
        ],
      },
    ],
    certLink: "#",
  },
];
