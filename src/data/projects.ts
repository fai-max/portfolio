export interface Project {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  techStack: string[];
  github?: string;
  live?: string;
  featured: boolean;
  type: "tech" | "creative" | "both";
}

export const projects: Project[] = [
  {
    id: "tangedco",
    name: "TANGEDCO (TNEB)",
    subtitle: "Sponsored Project",
    description:
      "Android app for electricity board employees to capture, store, and manage substation asset data offline, with synchronized cloud backup when connectivity is available.",
    techStack: ["Android", "Kotlin", "SQLite", "REST API"],
    featured: true,
    type: "tech",
  },
  {
    id: "booth-calculator",
    name: "Booth Calculator",
    subtitle: "Algorithm Visualizer",
    description:
      "Interactive multiplier based on Booth's algorithm with an intuitive UI. Converts decimal integers to binary and visualizes register-level computations step by step.",
    techStack: ["JavaScript", "HTML/CSS", "Algorithm Design"],
    github: "https://github.com/fai-max/booth-calculator",
    featured: true,
    type: "tech",
  },
  {
    id: "glug",
    name: "Glug.",
    subtitle: "iOS Social App",
    description:
      "An iOS social media app that promotes hydration through short video shares. Features leaderboards, badges, and challenges — making drinking water fun and engaging.",
    techStack: ["SwiftUI", "iOS", "Firebase", "Social Features"],
    github: "https://github.com/fai-max/glug",
    featured: true,
    type: "both",
  },
  {
    id: "3d-renders",
    name: "3D Render Collection",
    subtitle: "Personal Work",
    description:
      "Photorealistic and stylized 3D renders exploring material, light, and composition. Product visualizations, abstract art, and architectural studies.",
    techStack: ["Blender", "Cycles", "Substance Painter"],
    featured: true,
    type: "creative",
  },
  {
    id: "motion-reel",
    name: "Motion Graphics Reel",
    subtitle: "Video Production",
    description:
      "Compilation of motion graphics, kinetic typography, and cinematic edits produced for brands, clubs, and investor presentations.",
    techStack: ["DaVinci Resolve", "Fusion", "After Effects"],
    featured: true,
    type: "creative",
  },
  {
    id: "brand-print",
    name: "Brand & Print Design",
    subtitle: "Visual Identity",
    description:
      "Logo systems, poster series, social media kits, and publication layouts designed for university clubs and robotics startups.",
    techStack: ["Adobe Illustrator", "Affinity Publisher", "Figma"],
    featured: true,
    type: "creative",
  },
];
