export interface Skill {
  name: string;
  category: string;
  proficiency: number; // 1-5
  isHighlighted?: boolean;
}

export const skills: Skill[] = [
  // Languages
  { name: "Python", category: "Languages", proficiency: 5 },
  { name: "JavaScript", category: "Languages", proficiency: 4 },
  { name: "Swift", category: "Languages", proficiency: 4 },
  { name: "Kotlin", category: "Languages", proficiency: 4 },
  { name: "Java", category: "Languages", proficiency: 4 },
  { name: "C/C++", category: "Languages", proficiency: 3 },
  { name: "TypeScript", category: "Languages", proficiency: 4 },

  // Frameworks
  { name: "SwiftUI", category: "Frameworks", proficiency: 4 },
  { name: "Jetpack Compose", category: "Frameworks", proficiency: 4 },
  { name: "React", category: "Frameworks", proficiency: 4 },
  { name: "Next.js", category: "Frameworks", proficiency: 4 },
  { name: "Django", category: "Frameworks", proficiency: 3 },
  { name: "Textual", category: "Frameworks", proficiency: 4 },

  // Data & ML
  { name: "NumPy", category: "Data & ML", proficiency: 4 },
  { name: "Pandas", category: "Data & ML", proficiency: 4 },
  { name: "Power BI", category: "Data & ML", proficiency: 3 },
  { name: "OpenCV", category: "Data & ML", proficiency: 3 },
  { name: "Machine Learning", category: "Data & ML", proficiency: 3 },

  // Infrastructure
  { name: "Claude AI", category: "Infrastructure", proficiency: 5, isHighlighted: true },
  { name: "Supabase", category: "Infrastructure", proficiency: 5 },
  { name: "PostgreSQL", category: "Infrastructure", proficiency: 4 },
  { name: "Git", category: "Infrastructure", proficiency: 5 },
  { name: "Linux", category: "Infrastructure", proficiency: 4 },
  { name: "Android Studio", category: "Infrastructure", proficiency: 4 },

  // Creative
  { name: "Blender", category: "Creative", proficiency: 4 },
  { name: "DaVinci Resolve", category: "Creative", proficiency: 4 },
  { name: "Adobe Illustrator", category: "Creative", proficiency: 3 },
  { name: "Affinity Publisher", category: "Creative", proficiency: 3 },
  { name: "Video Editing", category: "Creative", proficiency: 4 },
  { name: "3D Modeling", category: "Creative", proficiency: 4 },
];

export const skillCategories = [
  "Languages",
  "Frameworks",
  "Data & ML",
  "Infrastructure",
  "Creative",
];
