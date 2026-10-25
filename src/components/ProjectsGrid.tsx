"use client";

import Image from "next/image";
import { ExternalLink, Laptop } from "lucide-react";
import { useState } from "react";
import { FilterBar } from "./FilterBar";
import { img, type Project } from "@/lib/data";

type Props = {
  projects: Project[];
  categories: string[];
  allLabel: string;
  emptyLabel: string;
  moreInfo: string;
};

export function ProjectsGrid({ projects, categories, allLabel, emptyLabel, moreInfo }: Props) {
  const [cat, setCat] = useState(allLabel);
  const list = cat === allLabel ? projects : projects.filter((p) => p.category === cat);

  return (
    <>
      <div className="mt-8">
        <FilterBar
          idPrefix="project-filter"
          options={[allLabel, ...categories]}
          value={cat}
          onChange={setCat}
        />
      </div>
      {list.length === 0 && <p className="mt-10 text-muted">{emptyLabel}</p>}
      <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((p) => (
          <li
            key={p.title}
            className="card-hover flex flex-col overflow-hidden rounded-3xl border border-line bg-surface"
          >
            {p.image ? (
              <Image
                src={img(p.image)!}
                alt={p.title}
                width={640}
                height={400}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 384px"
                className="aspect-[16/10] w-full object-cover"
              />
            ) : (
              <div className="grid aspect-[16/10] place-items-center bg-surface-2 text-line">
                <Laptop size={48} aria-hidden />
              </div>
            )}
            <div className="flex flex-1 flex-col p-6">
              <h3 className="font-display text-lg">{p.title}</h3>
              <p
                className="rich mt-3 flex-1 text-muted"
                dangerouslySetInnerHTML={{ __html: p.description }}
              />
              <ul className="mt-4 flex flex-wrap gap-2" aria-label="Tags">
                {p.tags.map((tag) => (
                  <li
                    key={tag}
                    className="rounded-full bg-surface-2 px-3 py-1 text-xs font-bold text-accent"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
              {p.link && (
                <a
                  href={p.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-2 font-bold text-accent"
                >
                  {moreInfo} <ExternalLink size={16} aria-hidden />
                </a>
              )}
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
