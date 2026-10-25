"use client";

import Image from "next/image";
import { CalendarDays, ExternalLink } from "lucide-react";
import { useState } from "react";
import { FilterBar } from "./FilterBar";
import { img, type EventItem } from "@/lib/data";

type Props = {
  events: EventItem[];
  categories: string[];
  allLabel: string;
  emptyLabel: string;
  moreDetails: string;
};

export function EventsGrid({ events, categories, allLabel, emptyLabel, moreDetails }: Props) {
  const [cat, setCat] = useState(allLabel);
  const list = cat === allLabel ? events : events.filter((e) => e.category === cat);

  return (
    <>
      <div className="mt-8">
        <FilterBar
          idPrefix="event-filter"
          options={[allLabel, ...categories]}
          value={cat}
          onChange={setCat}
        />
      </div>
      {list.length === 0 && <p className="mt-10 text-muted">{emptyLabel}</p>}
      <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {list.map((e) => (
          <li
            key={e.title}
            className="card-hover flex flex-col overflow-hidden rounded-3xl border border-line bg-surface"
          >
            {e.image ? (
              <Image
                src={img(e.image)!}
                alt={e.title}
                width={640}
                height={400}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 384px"
                className="aspect-[16/10] w-full object-cover"
              />
            ) : (
              <div className="grid aspect-[16/10] place-items-center bg-surface-2 text-line">
                <CalendarDays size={48} aria-hidden />
              </div>
            )}
            <div className="flex flex-1 flex-col p-6">
              <span className="text-xs font-bold uppercase tracking-wide text-accent">
                {e.date}
              </span>
              <h3 className="font-display mt-2 text-lg">{e.title}</h3>
              <span className="mt-1 text-sm font-bold text-muted">{e.role}</span>
              <p className="mt-3 flex-1 text-muted">{e.description}</p>
              {e.link && (
                <a
                  href={e.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-2 font-bold text-accent"
                >
                  {moreDetails} <ExternalLink size={16} aria-hidden />
                </a>
              )}
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
