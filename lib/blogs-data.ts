export interface BlogItem {
  id: string;
  title: string;
  author: string;
  date: string; // ISO format YYYY-MM-DD for sorting
  displayDate: string;
  category: "technical" | "personal";
  type: "article" | "tutorial" | "essay";
  description: string;
  url: string;
  external: boolean;
}

export const BLOGS_DATA: BlogItem[] = [
  {
    id: "system-design-for-beginners",
    title: "System Design For Beginners: Everything You Need in One Article",
    author: "Shivam Bhadani",
    date: "2024-12-21",
    displayDate: "21 Dec 2024",
    category: "technical",
    type: "article",
    description:
      "A beginner-friendly guide to system design covering scalability, databases, caching, distributed systems, load balancing, and core concepts used in real-world architectures and interviews.",
    url: "https://medium.com/@shivambhadani_/system-design-for-beginners-everything-you-need-in-one-article-c74eb702540b",
    external: true,
  },
  {
    id: "your-cpu-is-fast",
    title: "Your CPU is Fast. So Why is Your Program Still Slow?",
    author: "Veerendra Pradeep",
    date: "2026-02-10",
    displayDate: "10 Feb 2026",
    category: "personal",
    type: "article",
    description:
      "A deep dive into low-level performance, memory hierarchy, cache misses, and hardware bottlenecks that slow down code execution despite modern high-frequency CPUs.",
    url: "https://medium.com/@veerendrapradeep1432/your-cpu-is-fast-so-why-is-your-program-still-slow-d8cfde602f16",
    external: true,
  },
];
