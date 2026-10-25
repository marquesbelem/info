import { AUTHOR, absolute, paths, ui, type Lang } from "@/lib/site";

export function JsonLd({ lang, page }: { lang: Lang; page: "home" | "wiki" }) {
  const copy = ui[lang];
  const url = absolute(paths[page](lang));
  const personId = `${absolute("/")}#person`;

  const graph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": personId,
        name: AUTHOR.name,
        url: absolute("/"),
        image: absolute("/assets/camila_profile.jpg"),
        jobTitle:
          lang === "pt"
            ? "Engenheira de Software e Programadora de Jogos"
            : "Software Engineer and Game Programmer",
        description: copy.seoDescription,
        knowsAbout: ["C#", ".NET", "Unity", "Node.js", "AWS", "Docker", "CI/CD"],
        address: { "@type": "PostalAddress", addressRegion: "SP", addressCountry: "BR" },
        sameAs: [AUTHOR.linkedin, AUTHOR.github, AUTHOR.youtube],
      },
      {
        "@type": page === "home" ? "ProfilePage" : "CollectionPage",
        "@id": `${url}#page`,
        url,
        name: page === "home" ? copy.seoTitle : copy.wikiTitle,
        description: page === "home" ? copy.seoDescription : copy.wikiDescription,
        inLanguage: lang === "pt" ? "pt-BR" : "en",
        ...(page === "home"
          ? { mainEntity: { "@id": personId } }
          : { author: { "@id": personId } }),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph).replace(/</g, "\\u003c") }}
    />
  );
}
