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
    return "bg-[#00274d]/80 text-[#3178c6] border-[#3178c6]/40";
  }
  if (t.includes("react")) {
    return "bg-[#002b36]/80 text-[#61dafb] border-[#61dafb]/40";
  }
  if (t.includes("next")) {
    return "bg-[#1a1a1a]/80 text-white border-white/40";
  }
  if (t.includes("node")) {
    return "bg-[#0d2b18]/80 text-[#539e43] border-[#539e43]/40";
  }
  if (t.includes("python")) {
    return "bg-[#1a2b3c]/80 text-[#3776ab] border-[#3776ab]/40";
  }
  if (t.includes("fastapi")) {
    return "bg-[#052b27]/80 text-[#059669] border-[#059669]/40";
  }
  if (t.includes("pytorch")) {
    return "bg-[#341712]/80 text-[#ee4c2c] border-[#ee4c2c]/40";
  }
  if (t.includes("c11") || t === "c") {
    return "bg-[#1a2634]/80 text-[#a8b9cc] border-[#a8b9cc]/40";
  }
  if (t.includes("langgraph") || t.includes("claude") || t.includes("anthropic")) {
    return "bg-[#241335]/80 text-[#a855f7] border-[#a855f7]/40";
  }
  if (t.includes("streamlit")) {
    return "bg-[#33151b]/80 text-[#ff4b4b] border-[#ff4b4b]/40";
  }
  if (t.includes("opencv")) {
    return "bg-[#142338]/80 text-[#5c3ee8] border-[#5c3ee8]/40";
  }
  if (t.includes("scikit") || t.includes("pandas") || t.includes("numpy") || t.includes("nltk")) {
    return "bg-[#332211]/80 text-[#f7931e] border-[#f7931e]/40";
  }
  if (t.includes("supabase")) {
    return "bg-[#0d2b1e]/80 text-[#3ecf8e] border-[#3ecf8e]/40";
  }
  if (t.includes("tailwind")) {
    return "bg-[#0d2730]/80 text-[#38bdf8] border-[#38bdf8]/40";
  }
  if (t.includes("docker")) {
    return "bg-[#0d233a]/80 text-[#2496ed] border-[#2496ed]/40";
  }
  return "bg-[#1f1f24]/80 text-[#a1a1aa] border-white/20";
}
