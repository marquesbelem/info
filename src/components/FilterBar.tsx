"use client";

type Props = {
  options: string[];
  value: string;
  onChange: (v: string) => void;
  idPrefix: string;
};

export function FilterBar({ options, value, onChange, idPrefix }: Props) {
  return (
    <div role="group" className="flex flex-wrap gap-2">
      {options.map((o, i) => {
        const active = o === value;
        return (
          <button
            key={o}
            id={`${idPrefix}-${i}`}
            type="button"
            aria-pressed={active}
            onClick={() => onChange(o)}
            className={`min-h-10 rounded-full border px-4 text-sm font-bold transition ${
              active
                ? "border-accent bg-accent text-accent-fg"
                : "border-line bg-surface text-muted hover:border-accent hover:text-accent"
            }`}
          >
            {o}
          </button>
        );
      })}
    </div>
  );
}
