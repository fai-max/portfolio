import { experiences, type Experience } from "@/data/experience";
import { projects, type Project } from "@/data/projects";
import { skills, type Skill } from "@/data/skills";

const TECH_SKILL_CATEGORIES = ["Languages", "Frameworks", "Data & ML", "Infrastructure"];
const CREATIVE_SKILL_CATEGORIES = ["Creative"];

export function getFilteredExperiences(mode: "tech" | "creative"): Experience[] {
  return experiences.filter((exp) => exp.type === mode || exp.type === "both");
}

export function getFilteredProjects(mode: "tech" | "creative"): Project[] {
  return projects.filter((p) => p.type === mode || p.type === "both");
}

export function getFilteredSkillCategories(mode: "tech" | "creative"): string[] {
  return mode === "tech" ? TECH_SKILL_CATEGORIES : CREATIVE_SKILL_CATEGORIES;
}

export function getFilteredSkills(mode: "tech" | "creative"): Skill[] {
  const cats = getFilteredSkillCategories(mode);
  return skills.filter((s) => cats.includes(s.category));
}
