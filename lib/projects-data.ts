export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  status: "LIVE" | "BUILDING" | "ACTIVE" | "EXPERIMENTAL" | "OPEN SOURCE";
  description: string;
  image: string;
  technologies: string[];
  github: string;
  live?: string;
}

export const PROJECTS_DATA: ProjectItem[] = [
  {
    id: "initium",
    title: "initium",
    category: "AI · LLM Engine",
    status: "OPEN SOURCE",
    description:
      "Pure C11 LLM inference engine built completely from scratch without PyTorch, CUDA, or external libraries. Runs Llama-style model architectures directly on CPU with zero dependencies.",
    image: "/projects/initium.png",
    technologies: ["C", "Python", "Makefile", "POSIX Threads"],
    github: "https://github.com/virndra/initium",
  },
  {
    id: "neetcode-gpt",
    title: "neetcode-gpt",
    category: "AI · Deep Learning",
    status: "OPEN SOURCE",
    description:
      "GPT transformer architecture built from scratch in Python and PyTorch. Implements custom multi-head self-attention, positional encodings, feed-forward layers, and autoregressive generation.",
    image: "/projects/neetcode-gpt.png",
    technologies: ["Python", "PyTorch", "NumPy"],
    github: "https://github.com/virndra/neetcode-gpt",
  },
  {
    id: "ig-agent",
    title: "ig-agent",
    category: "AI Agent · Automation",
    status: "BUILDING",
    description:
      "Autonomous Instagram AI agent with a full management dashboard. Researches viral trends, schedules weekly content, generates AI captions, auto-publishes posts, and manages comment replies.",
    image: "/projects/ig-agent.png",
    technologies: ["Next.js", "TypeScript", "FastAPI", "LangGraph", "Anthropic", "Supabase"],
    github: "https://github.com/virndra/ig_agent",
  },
  {
    id: "qquerymind",
    title: "querymind",
    category: "AI · Database Agent",
    status: "ACTIVE",
    description:
      "Intelligent SQL Query assistant and database exploration engine. Converts natural language prompts into optimized SQL statements with automated schema analysis and visualization.",
    image: "/projects/qquerymind.png",
    technologies: ["React", "TypeScript", "Python", "FastAPI", "Tailwind CSS"],
    github: "https://github.com/virndra/Querymind",
  },
  {
    id: "chronic-disease-detetction",
    title: "chronic-disease-detetction",
    category: "AI · Healthcare",
    status: "LIVE",
    description:
      "End-to-end chronic disease risk prediction system featuring ML model pipelines, FastAPI inference microservices, and an interactive Streamlit UI for personalized health assessments.",
    image: "/projects/chronic-disease-detetction.png",
    technologies: ["Python", "FastAPI", "Streamlit", "Scikit-Learn", "Docker"],
    github: "https://github.com/virndra/chronic-disease-detection",
  },
  {
    id: "face-recognition-system",
    title: "face-recognition-system",
    category: "Computer Vision · AI",
    status: "ACTIVE",
    description:
      "Real-time facial recognition attendance management system. Detects facial features, identifies registered individuals in live camera streams, and logs color-coded attendance records.",
    image: "/projects/face-recognition-system.png",
    technologies: ["Python", "OpenCV", "Face Recognition", "Tkinter"],
    github: "https://github.com/virndra/recognition",
  },
  {
    id: "movie-recommendation",
    title: "movie-recommendation",
    category: "Data Science · Machine Learning",
    status: "OPEN SOURCE",
    description:
      "Personalized movie recommendation model leveraging content-based filtering and Cosine Similarity vectorization to analyze film metadata, genres, and user preference vectors.",
    image: "/projects/movie-recommendation.png",
    technologies: ["Python", "Pandas", "Scikit-Learn", "NLTK", "Jupyter"],
    github: "https://github.com/virndra/Movie-recommendation-Model-",
  },
];

export function getTechBadgeStyle(tech: string) {
  const t = tech.toLowerCase();
  if (t.includes("typescript") || t === "ts") {
    return "bg-blue-50 text-blue-700 border-blue-200 dark:bg-[#00274d]/80 dark:text-[#3178c6] dark:border-[#3178c6]/40";
  }
  if (t.includes("react")) {
    return "bg-sky-50 text-sky-700 border-sky-200 dark:bg-[#002b36]/80 dark:text-[#61dafb] dark:border-[#61dafb]/40";
  }
  if (t.includes("next")) {
    return "bg-neutral-100 text-neutral-900 border-neutral-300 dark:bg-[#1a1a1a]/80 dark:text-white dark:border-white/40";
  }
  if (t.includes("node")) {
    return "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-[#0d2b18]/80 dark:text-[#539e43] dark:border-[#539e43]/40";
  }
  if (t.includes("python")) {
    return "bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-[#1a2b3c]/80 dark:text-[#3776ab] dark:border-[#3776ab]/40";
  }
  if (t.includes("fastapi")) {
    return "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-[#052b27]/80 dark:text-[#059669] dark:border-[#059669]/40";
  }
  if (t.includes("pytorch")) {
    return "bg-orange-50 text-orange-700 border-orange-200 dark:bg-[#341712]/80 dark:text-[#ee4c2c] dark:border-[#ee4c2c]/40";
  }
  if (t.includes("c11") || t === "c") {
    return "bg-slate-100 text-slate-700 border-slate-300 dark:bg-[#1a2634]/80 dark:text-[#a8b9cc] dark:border-[#a8b9cc]/40";
  }
  if (t.includes("langgraph") || t.includes("claude") || t.includes("anthropic")) {
    return "bg-purple-50 text-purple-700 border-purple-200 dark:bg-[#241335]/80 dark:text-[#a855f7] dark:border-[#a855f7]/40";
  }
  if (t.includes("streamlit")) {
    return "bg-rose-50 text-rose-700 border-rose-200 dark:bg-[#33151b]/80 dark:text-[#ff4b4b] dark:border-[#ff4b4b]/40";
  }
  if (t.includes("opencv")) {
    return "bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-[#142338]/80 dark:text-[#5c3ee8] dark:border-[#5c3ee8]/40";
  }
  if (t.includes("scikit") || t.includes("pandas") || t.includes("numpy") || t.includes("nltk")) {
    return "bg-amber-50 text-amber-700 border-amber-200 dark:bg-[#332211]/80 dark:text-[#f7931e] dark:border-[#f7931e]/40";
  }
  if (t.includes("supabase")) {
    return "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-[#0d2b1e]/80 dark:text-[#3ecf8e] dark:border-[#3ecf8e]/40";
  }
  if (t.includes("tailwind")) {
    return "bg-sky-50 text-sky-700 border-sky-200 dark:bg-[#0d2730]/80 dark:text-[#38bdf8] dark:border-[#38bdf8]/40";
  }
  if (t.includes("docker")) {
    return "bg-sky-50 text-sky-700 border-sky-200 dark:bg-[#0d233a]/80 dark:text-[#2496ed] dark:border-[#2496ed]/40";
  }
  return "bg-neutral-100 text-neutral-700 border-neutral-300 dark:bg-[#1f1f24]/80 dark:text-[#a1a1aa] dark:border-white/20";
}
