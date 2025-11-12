"use client";

import Link from "next/link";
import { useState } from "react";

const subjects = [
  {
    id: "engineering-physics",
    title: "Engineering Physics",
    image: "https://lh3.googleusercontent.com/d/1QCfejlbeRO0kpAtty2lWBn63khnO95xt",
    href: "https://www.mujtoppers.in/branch/first/subjects/EngineeringPhysics",
    resources: [
      { label: "PYQs", href: "https://drive.google.com/drive/folders/1JaOn7wg3bmtV8rYkXGSwcMbfoKHik6E5?usp=drive_link" },
      { label: "Topper Notes", href: "https://drive.google.com/drive/folders/1thY2E0lTfi5lLWc675FUhFaJ0xBlq_qF?usp=drive_link" },
      { label: "Video Playlists", href: "https://www.youtube.com/playlist?list=PLuAADu3OvBt495Awir13ZNM-gv5IwLGQy" },
      { label: "Roadmap", href: "https://drive.google.com/file/d/1tMWeeRZ-9qhmQ0hoMlngzVmXSei-wotk/view?usp=sharing" },
      { label: "PPT Links", href: "https://drive.google.com/drive/folders/1qo2PcLf95yoRm1xVwjNzbLZ8pxTMLTMP?usp=drive_link" },
    ],
  },
  {
    id: "computational-mathematics",
    title: "Computational Mathematics",
    image: "https://lh3.googleusercontent.com/d/1hisb4ZBSJfngIez3m1HXLrFTTy1UCq24",
    href: "https://www.mujtoppers.in/branch/first/subjects/ComputationalMathematics",
    resources: [
      { label: "PYQs", href: "https://drive.google.com/drive/folders/1E9xiBOD7h4fPZmhdEPcgHbdfMCQFJShj?usp=drive_link" },
      { label: "Topper Notes", href: "https://drive.google.com/drive/folders/1uwQXdisM65p-Th-sUXc1TPh-X1mi8EbB?usp=drive_link" },
      { label: "Video Playlists", href: "https://www.youtube.com/playlist?list=PLDh_nHdEw3KPPjngTAmQgcYY8zBA6kkX8" },
      { label: "Roadmap", href: "https://drive.google.com/file/d/1LA8-hkDjSbpyNv7B4r8714hQXdXXzRnf/view?usp=sharing" },
      { label: "PPT Links", href: "https://drive.google.com/drive/folders/1WczQcbVvPcB294Jy3MjXcU_5u_-mbZMK?usp=drive_link" },
    ],
  },
  {
    id: "psuc",
    title: "PSUC",
    image: "https://lh3.googleusercontent.com/d/1qNmcdINQ1sgw6dVt2AaUsF2z3-ucWqNZ",
    href: "https://www.mujtoppers.in/branch/first/subjects/MATLAB",
    resources: [
      { label: "PYQs", href: "https://drive.google.com/drive/folders/1xSFhkhFRR1PH4ditPRf_FVIkfdK4JkRa?usp=drive_link" },
      { label: "Topper Notes", href: "https://drive.google.com/drive/folders/1sg0akPy_zBDDKiWKU_8pmuOTLlgyNtkq?usp=drive_link" },
      { label: "Video Playlists", href: "https://www.youtube.com/watch?v=aZb0iu4uGwA&t=8493s" },
      { label: "Roadmap", href: "https://drive.google.com/file/d/1z157mHPpnqS9nuAURS0gR14bUGUt7Cap/view?usp=sharing" },
      { label: "PPT Links", href: "https://drive.google.com/drive/folders/1QPtxeD2dVPCtpEcm3BX_G6vcyC8Wvyj8?usp=drive_link" },
    ],
  },
  {
    id: "wcs",
    title: "WCS",
    image: "https://lh3.googleusercontent.com/d/1n3ruALsALtnMSccMInUch_83O7MXDKgG",
    href: "https://www.mujtoppers.in/branch/first/subjects/BiologyForEngineers",
    resources: [
      { label: "PYQs", href: "https://drive.google.com/drive/folders/1jxiFP_HFpCYDSPb2hwd2wJHZrYbgqPPz?usp=drive_link" },
      { label: "Topper Notes", href: "https://drive.google.com/file/d/1s0PYtdlf8fIZvTwhY9I2LubZwSPWFgOH/view?usp=drive_link" },
      { label: "Video Playlists", href: "https://www.youtube.com/playlist?list=PLB_MQaW6RcuukNazriXq2TZYTyq8D_5uR" },
      { label: "Roadmap", href: "https://drive.google.com/file/d/1T5zICF1dFnYApzuu1nyw1vW_LbgAUasf/view?usp=sharing" },
      { label: "PPT Links", href: "https://drive.google.com/drive/folders/1JgGFDWvFm9N3Ur8K8-ylwTEKR55RqwNq?usp=drive_link" },
    ],
  },
  {
    id: "evs",
    title: "EVS",
    image: "https://lh3.googleusercontent.com/d/1fC03trFyiq4_laftnwfPbJ8OR8uCJMU_",
    href: "https://www.mujtoppers.in/branch/first/subjects/BiologyForEngineers",
    resources: [
      { label: "PYQs", href: "https://drive.google.com/drive/folders/1jxiFP_HFpCYDSPb2hwd2wJHZrYbgqPPz?usp=drive_link" },
      { label: "Topper Notes", href: "https://drive.google.com/file/d/1s0PYtdlf8fIZvTwhY9I2LubZwSPWFgOH/view?usp=drive_link" },
      { label: "Video Playlists", href: "https://www.youtube.com/playlist?list=PLB_MQaW6RcuukNazriXq2TZYTyq8D_5uR" },
      { label: "Roadmap", href: "https://drive.google.com/file/d/1T5zICF1dFnYApzuu1nyw1vW_LbgAUasf/view?usp=sharing" },
      { label: "PPT Links", href: "https://drive.google.com/drive/folders/1JgGFDWvFm9N3Ur8K8-ylwTEKR55RqwNq?usp=drive_link" },
    ],
  },
  {
    id: "biology-for-engineers",
    title: "Biology for Engineers",
    image: "https://lh3.googleusercontent.com/d/1R0KHNYsTXQN0z7JoqeowUxZTTdB8-iZ8",
    href: "https://www.mujtoppers.in/branch/first/subjects/BiologyForEngineers",
    resources: [
      { label: "PYQs", href: "https://drive.google.com/drive/folders/1jxiFP_HFpCYDSPb2hwd2wJHZrYbgqPPz?usp=drive_link" },
      { label: "Topper Notes", href: "https://drive.google.com/file/d/1s0PYtdlf8fIZvTwhY9I2LubZwSPWFgOH/view?usp=drive_link" },
      { label: "Video Playlists", href: "https://www.youtube.com/playlist?list=PLB_MQaW6RcuukNazriXq2TZYTyq8D_5uR" },
      { label: "Roadmap", href: "https://drive.google.com/file/d/1T5zICF1dFnYApzuu1nyw1vW_LbgAUasf/view?usp=sharing" },
      { label: "PPT Links", href: "https://drive.google.com/drive/folders/1JgGFDWvFm9N3Ur8K8-ylwTEKR55RqwNq?usp=drive_link" },
    ],
  },
];

export default function PhysicsCycleSubjects() {
  const [openSubject, setOpenSubject] = useState(null);

  return (
    <div className="relative min-h-screen overflow-hidden px-4 py-16 text-zinc-900 sm:px-8 lg:px-10">
      <div
        className="absolute inset-0 -z-20 bg-study-doodle bg-cover bg-center"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 -z-10 bg-linear-to-b from-white/95 via-zinc-100/90 to-white/95"
        aria-hidden="true"
      />
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-4 sm:px-6 lg:px-0">
        <header className="flex flex-col gap-5 text-center lg:max-w-3xl lg:text-left">
          <span className="inline-flex items-center justify-center gap-2 self-center rounded-full border border-white/15 bg-zinc-900/80 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white/85 backdrop-blur lg:self-start">
            Physics Cycle
          </span>
          <h1 className="text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
            Pick Your <span style={{ color: '#ff6a00' }}>Subject</span> And Dive Into The Resources
          </h1>
          <p className="text-sm leading-relaxed text-zinc-600 sm:text-base">
            Handpicked PDFs, PYQs, slide decks, and     lab files to keep your cycle prep focussed. Tap a subject to jump straight to the external
            resource listing.
          </p>
        </header>

        <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {subjects.map((subject, index) => {
            // Open upward for last 3 cards (bottom row), downward for first 2
            const isBottomRow = index >= 3;
            
            return (
            <article
              key={subject.id}
              className={`relative flex h-full flex-col overflow-visible rounded-3xl border border-gray-200 bg-white text-zinc-800 shadow-lg shadow-gray-900/5 transition duration-200 hover:-translate-y-1 hover:shadow-xl hover:border-orange-500 hover:shadow-orange-100/50 ${openSubject === subject.id ? "z-30" : "z-0"}`}
            >
              {/* Image */}
              <div className="relative h-48 w-full overflow-hidden rounded-t-3xl">
                <img
                  src={subject.image}
                  alt={subject.title}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-zinc-950/70 via-zinc-900/0" aria-hidden="true" />
                <span className="absolute bottom-4 left-4 inline-flex items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-zinc-900">
                  📚 {subject.title}
                </span>
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col gap-6 p-8">
                <h2 className="text-xl font-semibold leading-tight text-zinc-900">
                  {subject.title}
                </h2>
                <button
                  type="button"
                  onClick={() => setOpenSubject((prev) => (prev === subject.id ? null : subject.id))}
                  className="flex items-center justify-between gap-3 rounded-2xl border border-orange-200 bg-orange-50/50 px-4 py-3 text-sm font-semibold text-zinc-700 transition duration-200 hover:border-orange-400 hover:bg-orange-50"
                >
                  <span>Resource bundles</span>
                  <span className={`text-xs font-semibold uppercase tracking-wide transition ${openSubject === subject.id ? "text-orange-600" : "text-zinc-500"}`}>
                    {openSubject === subject.id ? "Hide" : "View"}
                  </span>
                </button>
              </div>
              {openSubject === subject.id && (
                <div className={`absolute left-6 right-6 z-40 duration-200 ${
                  isBottomRow 
                    ? 'bottom-[calc(40%-1rem)] animate-in fade-in slide-in-from-bottom-2' 
                    : 'top-[calc(95%-1rem)] animate-in fade-in slide-in-from-top-2'
                }`}>
                  <div className="rounded-2xl border border-zinc-200 bg-white/95 p-4 text-sm text-zinc-700 shadow-xl shadow-zinc-900/10 backdrop-blur">
                    <ul className="space-y-2">
                      {subject.resources.map((resource) => (
                        <li
                          key={resource.label}
                          className="group flex items-center justify-between gap-3 rounded-xl px-3 py-2 transition duration-200 hover:bg-orange-50"
                        >
                          <span className="transition-colors duration-200 group-hover:text-zinc-900">
                            {resource.label}
                          </span>
                          {resource.href.startsWith('/') ? (
                            <Link
                              href={resource.href}
                              className="inline-flex items-center gap-1 text-xs font-semibold text-zinc-700 transition-colors duration-200 hover:text-orange-600"
                            >
                              Open
                              <span aria-hidden="true">&gt;</span>
                            </Link>
                          ) : (
                            <a
                              href={resource.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-xs font-semibold text-zinc-700 transition-colors duration-200 hover:text-orange-600"
                            >
                              Open
                              <span aria-hidden="true">&gt;</span>
                            </a>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
            </article>
            );
          })}
        </section>

        <Link
          href="/first-year"
          className="inline-flex w-fit items-center gap-2 self-center rounded-full border border-white/15 bg-zinc-900/80 px-5 py-2 text-sm font-semibold text-white transition-colors duration-200 hover:bg-zinc-900 lg:self-start"
        >
          &larr; Back to cycles overview
        </Link>
      </main>
    </div>
  );
}
