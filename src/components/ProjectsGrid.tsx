"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, ExternalLink, Laptop, Play, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { FilterBar } from "./FilterBar";
import { img, videoUrl, type Project } from "@/lib/data";

type Props = {
  projects: Project[];
  categories: string[];
  allLabel: string;
  emptyLabel: string;
  moreInfo: string;
  watchVideo: string;
  close: string;
};

type NormalizedVideo = {
  src: string;
  description?: string;
};

const toSlug = (text: string) =>
  text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const getVideos = (p: Project): NormalizedVideo[] =>
  (p.videos ?? p.video ?? [])
    .map((item) => {
      if (typeof item === "string") {
        const src = item.trim();
        return src ? { src } : null;
      }
      if (item && typeof item === "object") {
        const raw = (item.src ?? item.video ?? item.url ?? "").trim();
        const desc = item.description?.trim();
        return raw ? { src: raw, description: desc || undefined } : null;
      }
      return null;
    })
    .filter((v): v is NormalizedVideo => Boolean(v));

export function ProjectsGrid({
  projects,
  categories,
  allLabel,
  emptyLabel,
  moreInfo,
  watchVideo,
  close,
}: Props) {
  const [cat, setCat] = useState(allLabel);
  const [active, setActive] = useState<Project | null>(null);
  const [videoIdx, setVideoIdx] = useState(0);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const initializedFromUrl = useRef(false);

  const list = cat === allLabel ? projects : projects.filter((p) => p.category === cat);
  const activeVideos = active ? getVideos(active) : [];
  const currentItem = activeVideos[videoIdx];
  const currentVideo = currentItem ? videoUrl(currentItem.src) : undefined;

  useEffect(() => {
    const syncFromUrl = () => {
      const params = new URLSearchParams(window.location.search);
      const rawProject = params.get("project") ?? params.get("projeto");
      if (!rawProject) {
        setActive(null);
        return;
      }
      const slug = toSlug(rawProject);
      const found = projects.find((p) => {
        const vids = getVideos(p);
        if (vids.length === 0) return false;
        return toSlug(p.title) === slug;
      });
      if (!found) return;
      const vids = getVideos(found);
      const rawVideo = Number(params.get("video") ?? "1");
      const idx =
        Number.isFinite(rawVideo) && rawVideo >= 1
          ? Math.min(Math.floor(rawVideo) - 1, vids.length - 1)
          : 0;
      setVideoIdx(idx);
      setActive(found);
    };

    syncFromUrl();
    initializedFromUrl.current = true;
    window.addEventListener("popstate", syncFromUrl);
    return () => window.removeEventListener("popstate", syncFromUrl);
  }, [projects]);

  useEffect(() => {
    if (!initializedFromUrl.current) return;
    const url = new URL(window.location.href);
    url.searchParams.delete("projeto");
    if (active) {
      url.searchParams.set("project", toSlug(active.title));
      url.searchParams.set("video", String(videoIdx + 1));
      if (!url.hash) url.hash = "projects";
    } else {
      url.searchParams.delete("project");
      url.searchParams.delete("video");
    }
    const nextUrl = url.pathname + url.search + url.hash;
    const currentUrl = window.location.pathname + window.location.search + window.location.hash;
    if (nextUrl !== currentUrl) {
      window.history.replaceState(null, "", nextUrl);
    }
  }, [active, videoIdx]);

  useEffect(() => {
    const d = dialogRef.current;
    if (!d) return;
    if (active && !d.open) d.showModal();
    if (!active && d.open) d.close();
  }, [active]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.defaultPlaybackRate = 2;
    v.playbackRate = 2;
  }, [currentVideo, active]);

  const openModal = (project: Project) => {
    setVideoIdx(0);
    setActive(project);
  };

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
        {list.map((p) => {
          const videos = getVideos(p);
          const hasVideos = videos.length > 0;
          return (
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
                {(p.link || hasVideos) && (
                  <div className="mt-5 flex flex-wrap items-center gap-4">
                    {p.link && (
                      <a
                        href={p.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 font-bold text-accent"
                      >
                        {moreInfo} <ExternalLink size={16} aria-hidden />
                      </a>
                    )}
                    {hasVideos && (
                      <button
                        type="button"
                        onClick={() => openModal(p)}
                        className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-line bg-surface-2 px-4 py-1.5 text-sm font-bold text-accent transition hover:border-accent"
                      >
                        <Play size={15} aria-hidden /> {watchVideo}
                      </button>
                    )}
                  </div>
                )}
              </div>
            </li>
          );
        })}
      </ul>

      <dialog
        ref={dialogRef}
        onClose={() => setActive(null)}
        onClick={(e) => e.target === dialogRef.current && setActive(null)}
        aria-labelledby="project-video-dialog-title"
        className="m-auto w-[min(92vw,52rem)] rounded-3xl border border-line bg-surface p-0 text-fg backdrop:bg-black/60 backdrop:backdrop-blur-sm"
      >
        {active && currentVideo && (
          <div className="p-6 sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="grid size-10 shrink-0 place-items-center rounded-2xl bg-accent text-accent-fg">
                  <Play size={20} aria-hidden />
                </span>
                <div>
                  <h3 id="project-video-dialog-title" className="font-display text-lg leading-snug">
                    {active.title}
                  </h3>
                  {activeVideos.length > 1 && (
                    <p className="text-xs font-bold text-accent">
                      {videoIdx + 1} / {activeVideos.length}
                    </p>
                  )}
                </div>
              </div>
              <button
                type="button"
                onClick={() => setActive(null)}
                aria-label={close}
                className="grid size-10 shrink-0 cursor-pointer place-items-center rounded-full border border-line hover:border-accent hover:text-accent"
              >
                <X size={18} aria-hidden />
              </button>
            </div>

            {currentItem?.description && (
              <div
                className="rich mt-4 text-sm text-muted"
                dangerouslySetInnerHTML={{ __html: currentItem.description }}
              />
            )}

            <div className="mt-5 overflow-hidden rounded-2xl border border-line bg-surface-2">
              <video
                ref={videoRef}
                key={currentVideo}
                src={currentVideo}
                controls
                controlsList="nodownload"
                onContextMenu={(e) => e.preventDefault()}
                onLoadedMetadata={(e) => {
                  e.currentTarget.defaultPlaybackRate = 2;
                  e.currentTarget.playbackRate = 2;
                }}
                autoPlay
                playsInline
                preload="metadata"
                className="aspect-video w-full"
              />
            </div>

            {activeVideos.length > 1 && (
              <div className="mt-4 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={() =>
                    setVideoIdx((i) => (i - 1 + activeVideos.length) % activeVideos.length)
                  }
                  className="grid size-9 shrink-0 cursor-pointer place-items-center rounded-full border border-line bg-surface-2 text-accent transition hover:border-accent"
                >
                  <ChevronLeft size={18} aria-hidden />
                </button>
                <div className="flex min-w-0 flex-1 items-center justify-start gap-1.5 overflow-x-auto px-1 py-1 sm:justify-center [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                  {activeVideos.map((v, i) => (
                    <button
                      key={v.src + i}
                      type="button"
                      ref={(el) => {
                        if (i === videoIdx && el) {
                          el.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
                        }
                      }}
                      onClick={() => setVideoIdx(i)}
                      className={`grid size-8 shrink-0 cursor-pointer place-items-center rounded-full text-xs font-bold transition ${
                        i === videoIdx
                          ? "bg-accent text-accent-fg"
                          : "border border-line bg-surface-2 text-muted hover:border-accent hover:text-accent"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => setVideoIdx((i) => (i + 1) % activeVideos.length)}
                  className="grid size-9 shrink-0 cursor-pointer place-items-center rounded-full border border-line bg-surface-2 text-accent transition hover:border-accent"
                >
                  <ChevronRight size={18} aria-hidden />
                </button>
              </div>
            )}
          </div>
        )}
      </dialog>
    </>
  );
}
