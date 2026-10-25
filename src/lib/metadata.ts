import type { Metadata } from "next";
import { absolute, paths, ui, type Lang } from "./site";

export function buildMetadata(lang: Lang, page: "home" | "wiki"): Metadata {
  const copy = ui[lang];
  const title = page === "home" ? copy.seoTitle : copy.wikiTitle;
  const description = page === "home" ? copy.seoDescription : copy.wikiDescription;
  const canonical = absolute(paths[page](lang));
  const image = absolute("/assets/banner.jpg");

  return {
    metadataBase: new URL(absolute("/")),
    title,
    description,
    authors: [{ name: "Camila Marques Belem" }],
    keywords:
      "Engenheira de Software, Desenvolvedora de Jogos, Unity, C#, .NET, Arquitetura de Sistemas, Cloud Computing, DevOps, Automação",
    alternates: {
      canonical,
      languages: {
        "pt-BR": absolute(paths[page]("pt")),
        en: absolute(paths[page]("en")),
        "x-default": absolute(paths[page]("pt")),
      },
    },
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/favicon.svg", type: "image/svg+xml" },
        { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      ],
      apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
    },
    manifest: "/site.webmanifest",
    openGraph: {
      type: "website",
      url: canonical,
      title,
      description,
      siteName: "Camila Marques Belem | Portfolio",
      locale: copy.locale,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: `${title} - Banner`,
          type: "image/jpeg",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      creator: "@CamisGameDev",
      images: [
        {
          url: image,
          alt: `${title} - Banner`,
        },
      ],
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    verification: {
      google: "TRPnYDXwc60dXaoEvm5IuE0pAudbSjeU1MXeNxnAH9Q",
    },
  };
}
