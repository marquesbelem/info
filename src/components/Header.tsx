import Link from "next/link";
import { Gamepad2, Globe } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { AUTHOR, paths, ui, type Lang } from "@/lib/site";
import type { Translation } from "@/lib/data";

type Props = { lang: Lang; t: Translation; current: "home" | "wiki" };

export function Header({ lang, t, current }: Props) {
  const home = paths.home(lang);
  const base = home === "/" ? "" : home;
  const links = [
    { href: `${base}/#projects`, label: t.nav.projects },
    { href: `${base}/#skills`, label: t.nav.skills },
    { href: `${base}/#events`, label: t.nav.events },
    { href: `${base}/#experience`, label: t.nav.experience },
    { href: paths.wiki(lang), label: t.nav.wiki, active: current === "wiki" },
  ];
  const otherLang: Lang = lang === "pt" ? "en" : "pt";
  const switchHref = current === "wiki" ? paths.wiki(otherLang) : paths.home(otherLang);
  const copy = ui[lang];

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/85 backdrop-blur-lg">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link
          href={home}
          aria-label={copy.home}
          className="font-display text-lg tracking-wide"
        >
          CAMILA <span className="text-accent">M. BELEM</span>
        </Link>

        <nav aria-label="Principal" className="hidden items-center gap-7 md:flex">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              aria-current={l.active ? "page" : undefined}
              className={`text-sm font-bold transition hover:text-accent ${
                l.active ? "text-accent" : "text-muted"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            id="gamedev-shortcut"
            href={AUTHOR.gamedev}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden h-11 items-center gap-2 rounded-full bg-accent px-5 text-sm font-bold text-accent-fg shadow-lg shadow-accent/25 transition hover:-translate-y-0.5 sm:inline-flex"
          >
            <Gamepad2 size={18} aria-hidden /> {copy.gamedevShort}
          </a>
          <Link
            id="lang-switch"
            href={switchHref}
            hrefLang={otherLang}
            lang={otherLang}
            aria-label={copy.otherLangLabel}
            className="inline-flex h-11 items-center gap-2 rounded-full border border-line bg-surface px-4 text-sm font-bold transition hover:border-accent hover:text-accent"
          >
            <Globe size={16} aria-hidden /> {copy.otherLang}
          </Link>
          <ThemeToggle toDark={copy.toDark} toLight={copy.toLight} />
        </div>
      </div>

      <nav
        aria-label={copy.openMenu}
        className="flex gap-5 overflow-x-auto border-t border-line px-4 py-2 md:hidden [&>*:first-child]:ml-auto [&>*:last-child]:mr-auto [&>*]:shrink-0"
      >
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className={`whitespace-nowrap py-1 text-sm font-bold ${
              l.active ? "text-accent" : "text-muted"
            }`}
          >
            {l.label}
          </Link>
        ))}
        <a
          href={AUTHOR.gamedev}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1 whitespace-nowrap py-1 text-sm font-bold text-accent sm:hidden"
        >
          <Gamepad2 size={14} aria-hidden /> {copy.gamedevShort}
        </a>
      </nav>
    </header>
  );
}
