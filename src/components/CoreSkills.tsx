"use client";

import { ArrowRight, Cog, Cpu, Network, Users, X, type LucideIcon } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { CoreSkill } from "@/lib/data";

const icons: Record<string, { Icon: LucideIcon; tone: string }> = {
  leadership: { Icon: Users, tone: "bg-brand-yellow text-[#17102e]" },
  backend: { Icon: Network, tone: "bg-brand-purple text-white" },
  performance: { Icon: Cpu, tone: "bg-brand-yellow text-[#17102e]" },
  tooling: { Icon: Cog, tone: "bg-brand-purple text-white" },
};

type Props = { skills: CoreSkill[]; learnMore: string; close: string };

export function CoreSkills({ skills, learnMore, close }: Props) {
  const [active, setActive] = useState<CoreSkill | null>(null);
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = ref.current;
    if (!d) return;
    if (active && !d.open) d.showModal();
    if (!active && d.open) d.close();
  }, [active]);

  const ActiveIcon = active ? icons[active.id]?.Icon : null;

  return (
    <>
      <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {skills.map((s) => {
          const { Icon, tone } = icons[s.id] ?? icons.backend;
          return (
            <li key={s.id}>
              <button
                id={`skill-${s.id}`}
                type="button"
                onClick={() => setActive(s)}
                className="card-hover flex h-full w-full flex-col rounded-3xl border border-line bg-surface p-6 text-left"
              >
                <span className={`grid size-14 place-items-center rounded-2xl ${tone}`}>
                  <Icon size={28} aria-hidden />
                </span>
                <h3 className="font-display mt-5 text-base leading-snug">{s.title}</h3>
                <span className="mt-1 text-sm font-bold text-accent">{s.subtitle}</span>
                <p className="mt-3 flex-1 text-muted">{s.shortDescription}</p>
                <span className="mt-4 inline-flex items-center gap-1 font-bold text-accent">
                  {learnMore} <ArrowRight size={16} aria-hidden />
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      <dialog
        ref={ref}
        onClose={() => setActive(null)}
        onClick={(e) => e.target === ref.current && setActive(null)}
        aria-labelledby="skill-dialog-title"
        className="m-auto w-[min(92vw,42rem)] rounded-3xl border border-line bg-surface p-0 text-fg backdrop:bg-black/60 backdrop:backdrop-blur-sm"
      >
        {active && (
          <div className="p-6 sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                {ActiveIcon && (
                  <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-accent text-accent-fg">
                    <ActiveIcon size={24} aria-hidden />
                  </span>
                )}
                <div>
                  <h3 id="skill-dialog-title" className="font-display text-lg leading-snug">
                    {active.title}
                  </h3>
                  <p className="text-sm font-bold text-accent">{active.subtitle}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActive(null)}
                aria-label={close}
                className="grid size-10 shrink-0 place-items-center rounded-full border border-line hover:border-accent hover:text-accent"
              >
                <X size={18} aria-hidden />
              </button>
            </div>
            <div
              className="rich mt-6 text-muted"
              dangerouslySetInnerHTML={{ __html: active.fullDescription }}
            />
          </div>
        )}
      </dialog>
    </>
  );
}
