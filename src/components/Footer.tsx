import type { Translation } from "@/lib/data";

export function Footer({ t }: { t: Translation }) {
  return (
    <footer className="mt-24 border-t border-line bg-surface">
      <p className="mx-auto max-w-6xl px-4 py-8 text-center text-sm text-muted">
        {t.footer.copyright}
      </p>
    </footer>
  );
}
