export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  type: "Internship" | "Freelance" | "Client Work" | "Open-Source";
  startDate: string;
  endDate: string;
  workMode: string;
  logo: string;
  responsibilities: string[];
  technologies: string[];
}

export const EXPERIENCES_DATA: ExperienceItem[] = [
  {
    id: "dhanam-collections",
    company: "Dhanam Collections",
    role: "Full Stack Developer",
    type: "Client Work",
    startDate: "Aug 2026",
    endDate: "Present",
    workMode: "Remote",
    logo: "/experiences/dhanam.png",
    responsibilities: [
      "Architected a custom D2C fashion e-commerce storefront & admin portal using **Next.js 16**, **React 19**, and **TypeScript**.",
      "Engineered a race-condition-safe **atomic stock hold engine** in **Drizzle ORM** & **PostgreSQL** with automated cart sweeping.",
      "Integrated **Razorpay** payments with idempotent webhooks and WebP image optimization pipelines.",
    ],
    technologies: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS v4", "Drizzle ORM", "PostgreSQL", "Razorpay"],
  },
  {
    id: "vabhaa",
    company: "VABHAA",
    role: "Founding Engineer",
    type: "Freelance",
    startDate: "Jun 2026",
    endDate: "Present",
    workMode: "Remote",
    logo: "/experiences/vabhaa.png",
    responsibilities: [
      "Designed and developed a full-stack D2C food e-commerce platform using **Next.js 14**, **TypeScript**, and **Tailwind CSS**.",
      "Architected **Supabase** backend infrastructure with PostgreSQL schema, RLS security policies, and Google OAuth.",
      "Built server-side checkout flow, Razorpay webhooks, custom loyalty points engine, and administrative portal.",
    ],
    technologies: ["Next.js 14", "TypeScript", "Tailwind CSS", "Supabase", "Razorpay", "Zod"],
  },
  {
    id: "aicte-ibm",
    company: "AICTE / IBM SkillsBuild",
    role: "AI Intern",
    type: "Internship",
    startDate: "Nov 2024",
    endDate: "Dec 2024",
    workMode: "Remote",
    logo: "/experiences/ibm.png",
    responsibilities: [
      "Completed a **6-week Artificial Intelligence Internship** conducted by **AICTE** & **Edunet Foundation** using **IBM SkillsBuild**.",
      "Developed a **Movie Recommendation System** using **Python**, **Pandas**, **Scikit-Learn**, and **NLTK** for natural language feature extraction.",
      "Implemented **Cosine Similarity** vector matrix scoring to compute pairwise similarity and output recommendations.",
    ],
    technologies: ["Python", "Pandas", "Scikit-Learn", "NLTK", "Jupyter"],
  },
];
