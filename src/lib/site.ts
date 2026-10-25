export type Lang = "pt" | "en";

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://marquesbelem.github.io/info"
).replace(/\/$/, "");

export const AUTHOR = {
  name: "Camila Marques Belem",
  linkedin: "https://www.linkedin.com/in/camila-marques-belem/",
  github: "https://github.com/marquesbelem",
  youtube: "https://www.youtube.com/@CamisGameDev",
  gamedev: "https://camisgamedev.vercel.app/",
};

export const paths = {
  home: (lang: Lang) => (lang === "pt" ? "/" : "/en"),
  wiki: (lang: Lang) => (lang === "pt" ? "/wiki" : "/en/wiki"),
};

export const absolute = (path: string) =>
  `${SITE_URL}${path === "/" ? "/" : path}`;

export const ui = {
  pt: {
    locale: "pt_BR",
    skip: "Ir para o conteúdo",
    toDark: "Ativar modo escuro",
    toLight: "Ativar modo claro",
    all: "Todos",
    home: "Início",
    openMenu: "Menu principal",
    badge: "8+ anos",
    gamedevShort: "Camis GameDev",
    gamedevTitle: "Aulas e mentoria de programação",
    gamedevText: "Quer aprender a programar criando jogos? Conheça meu site de aulas e mentoria.",
    gamedevCta: "Visitar Camis GameDev",
    stack: "Stack do dia a dia",
    otherLang: "EN",
    otherLangLabel: "Switch to English",
    seoTitle: "Camila Marques Belem | Engenheira de Software e Programadora de Jogos",
    seoDescription:
      "Engenheira de Software e Programadora de Jogos com 8+ anos de experiência em C#, .NET e Unity. Especialista em arquitetura de sistemas escaláveis, automação e infraestrutura cloud.",
    wikiTitle: "Camis Wiki | Camila Marques Belem",
    wikiDescription:
      "Camis Wiki: Pequenos posts, insights e anotações sobre C#, .NET, Unity, DevOps e Cloud AWS por Camila Marques Belem.",
    languagesLabel: "Linguagens & Frameworks",
  },
  en: {
    locale: "en_US",
    skip: "Skip to content",
    toDark: "Enable dark mode",
    toLight: "Enable light mode",
    all: "All",
    home: "Home",
    openMenu: "Main menu",
    badge: "8+ years",
    gamedevShort: "Camis GameDev",
    gamedevTitle: "Programming classes & mentoring",
    gamedevText: "Want to learn to code by making games? Check out my classes and mentoring site.",
    gamedevCta: "Visit Camis GameDev",
    stack: "Daily stack",
    otherLang: "PT",
    otherLangLabel: "Mudar para português",
    seoTitle: "Camila Marques Belem | Software Engineer & Game Programmer",
    seoDescription:
      "Software Engineer and Game Programmer with 8+ years of experience in C#, .NET and Unity. Specialist in scalable system architecture, automation and cloud infrastructure.",
    wikiTitle: "Camis Wiki | Camila Marques Belem",
    wikiDescription:
      "Camis Wiki: short posts, insights and notes about C#, .NET, Unity, DevOps and AWS Cloud by Camila Marques Belem.",
    languagesLabel: "Languages & Frameworks",
  },
} as const;
