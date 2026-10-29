export type Role = {
  org: string;
  title: string;
  team?: string;
  location: string;
  period: string;
  summary: string;
  work: { heading: string; detail: string }[];
  tools: string[];
};

// Newest first. Add future roles to the top of this list.
export const experience: Role[] = [
  {
    org: "Google",
    title: "Software Engineering Intern",
    team: "Google Play Games",
    location: "Bengaluru",
    period: "May – Jul 2026",
    summary:
      "Worked on the Play Games plugin for Unity — how developers install it and how it's packaged — and on the Play Games network stack.",
    work: [
      {
        heading: "Unity Package Manager support",
        detail:
          "Built UPM compatibility for the Play Games plugin with automated dependency resolution, cutting developer setup from 5–10 minutes to under a minute.",
      },
      {
        heading: "One repository, two package formats",
        detail:
          "Designed a unified monorepo layout with Gradle build tasks that produce both UPM and legacy packages, reducing the committed version-control footprint by 77% (4.5 MB to under 1 MB).",
      },
      {
        heading: "Network stack migration",
        detail:
          "Migrated Play Games from legacy gRPC wrappers to standard xRPC channels behind a centralized connection factory, so connections are pooled over GMS Core's shared Cronet engine instead of paying a fresh handshake each time.",
      },
    ],
    tools: ["Unity Package Manager", "Gradle", "gRPC", "xRPC", "Cronet"],
  },
  {
    org: "IIT Mandi",
    title: "Research & Development Intern",
    location: "Mandi",
    period: "Jan – May 2026",
    summary:
      "Built a desktop tool that automates seismic risk assessment for a city, from street-level imagery to risk maps that officials can use for safety planning.",
    work: [
      {
        heading: "Building detection and classification",
        detail:
          "An AI-powered PyQt5 application that detects buildings in street-level imagery and classifies each one into 24 structural categories.",
      },
      {
        heading: "Geospatial risk engine",
        detail:
          "Computes earthquake damage probabilities and financial-loss ratios per structure, shown on interactive colour-coded Folium maps.",
      },
      {
        heading: "Imagery and 3D pipeline",
        detail:
          "Acquires Google Street View imagery through its API and generates 3D spatial-twin models, with drone photogrammetry through NodeODM.",
      },
    ],
    tools: ["Python", "PyQt5", "PyTorch", "TensorFlow", "Folium", "NodeODM"],
  },
];
