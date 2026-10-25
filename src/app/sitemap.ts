import type { MetadataRoute } from "next";
import { absolute, paths } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entry = (page: "home" | "wiki", priority: number) => ({
    url: absolute(paths[page]("pt")),
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority,
    alternates: {
      languages: {
        "pt-BR": absolute(paths[page]("pt")),
        en: absolute(paths[page]("en")),
      },
    },
  });
  return [
    entry("home", 1),
    entry("wiki", 0.8),
    { url: absolute(paths.home("en")), lastModified: now, priority: 0.9 },
    { url: absolute(paths.wiki("en")), lastModified: now, priority: 0.7 },
  ];
}
