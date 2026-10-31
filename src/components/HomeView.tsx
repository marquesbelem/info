import Image from "next/image";
import { ArrowRight, BookOpen, Briefcase, Code2, ExternalLink, Gamepad2, Play } from "lucide-react";
import Link from "next/link";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { JsonLd } from "./JsonLd";
import { ProjectsGrid } from "./ProjectsGrid";
import { EventsGrid } from "./EventsGrid";
import { CoreSkills } from "./CoreSkills";
import { getData } from "@/lib/data";
import { AUTHOR, paths, ui, type Lang } from "@/lib/site";

const sk = (slug: string) => `https://skillicons.dev/icons?i=${slug}`;
const languages = [
  ["C#", sk("cs")],
  ["C", sk("c")],
  ["C++", sk("cpp")],
  [".NET", sk("dotnet")],
  ["JavaScript", sk("js")],
  ["Node.js", sk("nodejs")],
  ["Express", sk("express")],
  ["jQuery", sk("jquery")],
];
const tools = [
  ["Unity", sk("unity")],
  ["AWS", sk("aws")],
  ["DynamoDB", sk("dynamodb")],
  ["Docker", sk("docker")],
  ["NPM", "https://i.postimg.cc/L8k9jKJ2/Group.png"],
  ["Firebase", sk("firebase")],
  ["Jenkins", sk("jenkins")],
  ["Bash", sk("bash")],
];

const stack = ["C#", ".NET", "Unity", "Node.js", "AWS", "Docker"];

function SectionTitle({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="font-display text-3xl sm:text-4xl">
      {children}
    </h2>
  );
}

function IconRow({ title, items }: { title: string; items: string[][] }) {
  return (
    <div className="mt-12 text-center">
      <h3 className="font-display text-lg text-accent">{title}</h3>
      <ul className="mt-6 flex flex-wrap justify-center gap-4">
        {items.map(([name, src]) => (
          <li
            key={name}
            className="card-hover grid size-20 place-items-center rounded-2xl border border-line bg-surface"
          >
            <Image
              src={src}
              alt={name}
              title={name}
              width={48}
              height={48}
              unoptimized
              className="size-12"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

export function HomeView({ lang }: { lang: Lang }) {
  const d = getData(lang);
  const { t } = d;
  const copy = ui[lang];
  const social = [
    { href: AUTHOR.linkedin, label: "LinkedIn", Icon: Briefcase },
    { href: AUTHOR.github, label: "GitHub", Icon: Code2 },
    { href: AUTHOR.youtube, label: "YouTube", Icon: Play },
  ];

  return (
    <>
      <Header lang={lang} t={t} current="home" />
      <main id="conteudo">
        <section className="glow-bg dots relative overflow-hidden">
          <div className="absolute inset-0 -z-0" aria-hidden>
            <Image
              src="/assets/camila_profile.jpg"
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover object-[center_40%]"
            />
            <div className="absolute inset-0 bg-bg/10 dark:bg-bg/85" />
            <div className="absolute inset-0 bg-gradient-to-b from-bg/95 via-bg/70 via-45% to-transparent to-65% dark:hidden" />
            <div className="absolute inset-0 bg-gradient-to-b from-bg/30 via-transparent via-70% to-bg" />
          </div>
          <div className="relative mx-auto max-w-4xl px-4 pb-10 pt-12 text-center md:pt-16">
            <h1
              className="rise font-display mx-auto max-w-3xl text-4xl leading-tight sm:text-5xl [&_span]:mt-2 [&_span]:block [&_span]:text-accent"
              dangerouslySetInnerHTML={{ __html: t.hero.title }}
            />
            <p className="mt-4 text-xl font-bold">{t.hero.lead}</p>
            <p
              className="mx-auto mt-3 max-w-2xl text-lg text-muted [&_strong]:text-fg"
              dangerouslySetInnerHTML={{ __html: t.hero.description }}
            />

            <ul className="mt-5 flex flex-wrap justify-center gap-2" aria-label={copy.stack}>
              {stack.map((s) => (
                <li
                  key={s}
                  className="rounded-lg border border-line bg-surface px-3 py-1.5 font-mono text-sm font-bold text-accent"
                >
                  {s}
                </li>
              ))}
            </ul>

            {/* Espaço aberto para o rosto aparecer na foto de fundo */}
            <div className="h-32 sm:h-40 md:h-44" aria-hidden />

            <div className="flex flex-wrap items-center justify-center gap-3">
              {social.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer me"
                  className="inline-flex min-h-11 items-center gap-2 rounded-full border-2 border-line bg-surface px-5 py-2 font-bold transition hover:-translate-y-0.5 hover:border-accent hover:text-accent"
                >
                  <Icon size={18} aria-hidden /> {label}
                </a>
              ))}
              <Link
                id="hero-projects"
                href="#projects"
                className="inline-flex min-h-11 items-center gap-2 rounded-full bg-accent px-5 py-2 font-bold text-accent-fg shadow-lg shadow-accent/25 transition hover:-translate-y-0.5"
              >
                {t.nav.projects} <ArrowRight size={18} aria-hidden />
              </Link>
              <Link
                href={paths.wiki(lang)}
                className="inline-flex items-center gap-2 px-2 font-bold text-accent"
              >
                <BookOpen size={18} aria-hidden /> {t.nav.wiki}
              </Link>
            </div>
          </div>
          <div className="relative mx-auto max-w-3xl px-4 pb-10">
            <a
              id="gamedev-banner"
              href={AUTHOR.gamedev}
              target="_blank"
              rel="noopener noreferrer"
              className="card-hover flex flex-col items-start gap-3 rounded-2xl border border-line bg-surface px-4 py-3 sm:flex-row sm:items-center"
            >
              <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-brand-purple text-white">
                <Gamepad2 size={18} aria-hidden />
              </span>
              <span className="flex-1">
                <span className="font-display block text-sm">{copy.gamedevTitle}</span>
                <span className="block text-sm text-muted">{copy.gamedevText}</span>
              </span>
              <span className="inline-flex items-center gap-2 text-sm font-bold text-accent">
                {copy.gamedevCta} <ExternalLink size={14} aria-hidden />
              </span>
            </a>
          </div>
        </section>

        <section id="projects" className="mx-auto max-w-6xl scroll-mt-28 px-4 pt-20">
          <SectionTitle id="projects-title">{t.projects.title}</SectionTitle>
          <ProjectsGrid
            projects={d.projects}
            categories={d.projectCategories}
            allLabel={copy.all}
            emptyLabel={t.projects.empty}
            moreInfo={t.projects.more_info}
          />
        </section>

        <section id="skills" className="mx-auto max-w-6xl scroll-mt-28 px-4 pt-24">
          <SectionTitle id="skills-title">{t.skills.title}</SectionTitle>
          <CoreSkills skills={d.skills} learnMore={t.skills.learn_more} close={t.modal.close} />
          <IconRow title={t.skills.languages} items={languages} />
          <IconRow title={t.skills.tools} items={tools} />
        </section>

        <section id="events" className="mx-auto max-w-6xl scroll-mt-28 px-4 pt-24">
          <SectionTitle id="events-title">{t.events.title}</SectionTitle>
          <EventsGrid
            events={d.events}
            categories={d.eventCategories}
            allLabel={copy.all}
            emptyLabel={t.events.empty}
            moreDetails={t.events.more_details}
          />
        </section>

        <section id="experience" className="mx-auto max-w-4xl scroll-mt-28 px-4 pt-24">
          <SectionTitle id="experience-title">{t.experience.title}</SectionTitle>
          <ol className="relative mt-10 space-y-6 border-l-2 border-line pl-8">
            {d.experience.map((e) => (
              <li key={e.date + e.company} className="relative">
                <span
                  className="absolute -left-[2.6rem] top-6 size-4 rounded-full border-4 border-bg bg-accent"
                  aria-hidden
                />
                <div className="card-hover rounded-3xl border border-line bg-surface p-6">
                  <span className="text-xs font-bold uppercase tracking-wide text-accent">
                    {e.date}
                  </span>
                  <h3 className="font-display mt-2 text-lg">{e.company}</h3>
                  <p className="mt-1 text-muted">{e.role}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>
      </main>
      <Footer t={t} />
      <JsonLd lang={lang} page="home" />
    </>
  );
}
