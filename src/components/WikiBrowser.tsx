"use client";

import Link from "next/link";
import { FolderOpen, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { FilterBar } from "./FilterBar";
import type { WikiPost } from "@/lib/data";

type Props = {
  posts: WikiPost[];
  categories: string[];
  allLabel: string;
  placeholder: string;
  empty: string;
  projectsHref: string;
};

export function WikiBrowser({ posts, categories, allLabel, placeholder, empty, projectsHref }: Props) {
  const [cat, setCat] = useState(allLabel);
  const [query, setQuery] = useState("");

  const list = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter(
      (p) =>
        (cat === allLabel || p.category === cat) &&
        (!q ||
          p.title.toLowerCase().includes(q) ||
          p.content.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q)),
    );
  }, [posts, cat, query, allLabel]);

  return (
    <>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <FilterBar
          idPrefix="wiki-filter"
          options={[allLabel, ...categories]}
          value={cat}
          onChange={setCat}
        />
        <label className="relative block md:w-80">
          <span className="sr-only">{placeholder}</span>
          <Search
            size={18}
            aria-hidden
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted"
          />
          <input
            id="wiki-search-input"
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={placeholder}
            className="w-full rounded-full border border-line bg-surface py-3 pl-11 pr-4 text-base placeholder:text-muted/70 focus:border-accent"
          />
        </label>
      </div>

      {list.length === 0 ? (
        <p className="mt-16 text-center text-lg text-muted">{empty}</p>
      ) : (
        <ul className="mt-10 grid gap-6 md:grid-cols-2">
          {list.map((p) => (
            <li
              key={p.id}
              className="card-hover flex flex-col rounded-3xl border border-line bg-surface p-6 sm:p-8"
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-accent px-3 py-1 text-xs font-bold text-accent-fg">
                  {p.category}
                </span>
                {p.project && (
                  <Link
                    href={projectsHref}
                    className="inline-flex items-center gap-1 rounded-full border border-line bg-surface-2 px-3 py-1 text-xs font-bold text-accent"
                  >
                    <FolderOpen size={12} aria-hidden /> {p.project}
                  </Link>
                )}
              </div>
              <h3 className="font-display mt-4 text-lg leading-snug">{p.title}</h3>
              <p
                className="rich mt-3 text-muted"
                dangerouslySetInnerHTML={{ __html: p.content }}
              />
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
