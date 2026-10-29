export const site = {
  name: "Shubh Sahu",
  role: "Software engineer",
  // Set this once the site has a domain; it enables absolute Open Graph URLs and the canonical link.
  url: undefined as string | undefined,
  description:
    "Shubh Sahu is a computer science student at IIT Mandi (class of 2027) who builds backend and distributed systems. Previously a software engineering intern at Google.",
  email: "shubhxtech@gmail.com",
  resume: "/Shubh_Sahu_Resume.pdf",
  location: "Mandi, India",
  links: {
    github: "https://github.com/shubhxtech",
    linkedin: "https://www.linkedin.com/in/shubhxtech/",
    leetcode: "https://leetcode.com/shubhxtech/",
    codeforces: "https://codeforces.com/profile/shubhxtech",
    codechef: "https://www.codechef.com/users/shubhxtech",
    source: "https://github.com/shubhxtech/portfolio-shubh",
  },
} as const;

export const glance: { label: string; value: string; href?: string }[] = [
  { label: "Studying", value: "B.Tech Computer Science, IIT Mandi · 2023–27 · CGPA 8.77" },
  { label: "Previously", value: "Software Engineering Intern, Google · Summer 2026" },
  { label: "Building", value: "A Raft-replicated key-value store; AutoShorts" },
  { label: "Practice", value: "Codeforces Specialist · CodeChef 1750+" },
];

export const nav = [
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
] as const;
