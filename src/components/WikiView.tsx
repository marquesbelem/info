import { Header } from "./Header";
import { Footer } from "./Footer";
import { JsonLd } from "./JsonLd";
import { WikiBrowser } from "./WikiBrowser";
import { getData } from "@/lib/data";
import { paths, ui, type Lang } from "@/lib/site";

export function WikiView({ lang }: { lang: Lang }) {
  const d = getData(lang);
  const { t } = d;
  const home = paths.home(lang);

  return (
    <>
      <Header lang={lang} t={t} current="wiki" />
      <main id="conteudo">
        <section className="glow-bg relative overflow-hidden">
          <div className="rise mx-auto max-w-3xl px-4 py-16 text-center md:py-24">
            <h1
              className="font-display text-4xl leading-tight sm:text-5xl lg:text-6xl [&_span]:text-accent"
              dangerouslySetInnerHTML={{ __html: t.wiki.hero_title }}
            />
            <p className="mt-6 text-xl font-bold">{t.wiki.hero_lead}</p>
            <p
              className="mt-4 text-lg text-muted [&_strong]:text-fg"
              dangerouslySetInnerHTML={{ __html: t.wiki.hero_description }}
            />
            <p className="mt-6 inline-block rounded-2xl border border-line bg-surface px-5 py-3 text-sm font-bold text-muted">
              {t.wiki.hero_alert}
            </p>
          </div>
        </section>

        <section id="wiki" className="mx-auto max-w-6xl px-4 pt-16">
          <WikiBrowser
            posts={d.wiki}
            categories={d.wikiCategories}
            allLabel={ui[lang].all}
            placeholder={t.wiki.search_placeholder}
            empty={t.wiki.empty}
            projectsHref={`${home === "/" ? "" : home}/#projects`}
          />
        </section>
      </main>
      <Footer t={t} />
      <JsonLd lang={lang} page="wiki" />
    </>
  );
}
