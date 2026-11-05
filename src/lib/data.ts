import type { Lang } from "./site";

import ptProjects from "@/data/pt/projects.json";
import enProjects from "@/data/en/projects.json";
import ptEvents from "@/data/pt/events.json";
import enEvents from "@/data/en/events.json";
import ptExperience from "@/data/pt/experience.json";
import enExperience from "@/data/en/experience.json";
import ptSkills from "@/data/pt/core-skills.json";
import enSkills from "@/data/en/core-skills.json";
import ptWiki from "@/data/pt/wiki.json";
import enWiki from "@/data/en/wiki.json";
import ptT from "@/data/pt/translation.json";
import enT from "@/data/en/translation.json";

export type ProjectVideo =
  | string
  | {
      src?: string;
      video?: string;
      url?: string;
      description?: string;
    };

export type Project = {
  title: string;
  description: string;
  tags: string[];
  link?: string | null;
  image?: string | null;
  videos?: ProjectVideo[] | null;
  video?: ProjectVideo[] | null;
  category: string;
};
export type EventItem = {
  title: string;
  date: string;
  role: string;
  link?: string;
  category: string;
  description: string;
  image?: string;
};
export type Experience = { date: string; company: string; role: string };
export type CoreSkill = {
  id: string;
  title: string;
  subtitle: string;
  shortDescription: string;
  fullDescription: string;
};
export type WikiPost = {
  id: string;
  title: string;
  category: string;
  project?: string;
  content: string;
  date?: string;
};
export type Translation = typeof ptT;

/** Normaliza "./assets/x" e "assets/x" para "/assets/x" (pasta public). */
export const img = (src?: string | null) =>
  src ? "/" + src.replace(/^\.?\//, "") : undefined;

/** Normaliza caminhos de vídeo para "/assets/videos/..." ou "/assets/...". */
export const videoUrl = (src: string) => {
  const clean = src.trim().replace(/^\.?\//, "");
  if (/^https?:\/\//i.test(clean)) return clean;
  if (clean.startsWith("assets/")) return "/" + clean;
  return "/assets/videos/" + clean.replace(/^videos\//, "");
};

const byImageFirst = <T extends { image?: string | null }>(list: T[]) =>
  [...list].sort((a, b) => (b.image ? 1 : 0) - (a.image ? 1 : 0));

export function getData(lang: Lang) {
  const pt = lang === "pt";
  const projects = byImageFirst((pt ? ptProjects : enProjects) as Project[]);
  const events = byImageFirst((pt ? ptEvents : enEvents) as EventItem[]);
  const wiki = [...((pt ? ptWiki : enWiki) as WikiPost[])].sort(
    (a, b) => +new Date(b.date ?? 0) - +new Date(a.date ?? 0),
  );
  const unique = (list: { category: string }[]) => [
    ...new Set(list.map((i) => i.category).filter(Boolean)),
  ];
  return {
    t: (pt ? ptT : enT) as Translation,
    projects,
    events,
    wiki,
    experience: (pt ? ptExperience : enExperience) as Experience[],
    skills: (pt ? ptSkills : enSkills) as CoreSkill[],
    projectCategories: unique(projects),
    eventCategories: unique(events),
    wikiCategories: unique(wiki),
  };
}
