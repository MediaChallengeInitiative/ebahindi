"use client";

import dynamic from "next/dynamic";
import Section from "./Section";
import { skills, aiMediaLab, about } from "@/content/site";
import { useCanvasGate } from "./three/useCanvasGate";

const WireframeWidget = dynamic(() => import("./three/WireframeWidget"), { ssr: false });

/**
 * Bento grid. Ovro's own skill section is a plain two-column list; the bento is
 * the one place the original prompt's structure is layered on top, because it
 * gives the 3D widget somewhere to live that isn't the hero.
 */
export default function Skills() {
  const { ref, inView, supported, reduced } = useCanvasGate<HTMLDivElement>();
  const showWidget = supported && inView;

  const [ai, stack] = skills.groups;

  return (
    <Section
      id="skills"
      label={skills.label}
      heading={skills.heading}
    >
      <div className="mt-8 grid auto-rows-min gap-4 sm:mt-10 sm:gap-5 md:grid-cols-3">
        {/* Wide cell — the positioning claim */}
        <div className="reveal card-quiet p-6 sm:p-7 md:col-span-2 hover:border-amber/40">
          <h3 className="text-xl font-extrabold">{ai.title}</h3>
          <p className="mt-2 text-[15px] text-white/60">{ai.blurb}</p>
          <ul className="mt-6 flex flex-wrap gap-2.5">
            {ai.items.map((item) => (
              <li key={item} className="tag">
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* 3D cell */}
        <div
          ref={ref}
          className="reveal card-quiet relative min-h-[200px] overflow-hidden p-6 sm:min-h-[220px] sm:p-7 hover:border-amber/40"
          style={{ transitionDelay: "80ms" }}
        >
          <div aria-hidden="true" className="absolute inset-0 opacity-55">
            {showWidget ? <WireframeWidget reduced={reduced} /> : null}
          </div>
          {/* Scrim so the label stays legible over the wireframe. */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-br from-teal-700/95 via-teal-700/70 to-transparent"
          />
          <div className="relative">
            <p className="label">Daily driver</p>
            <p className="mt-2 text-[15px] leading-relaxed text-white/70">
              AI is not a side interest here — it is the working method.
            </p>
          </div>
        </div>

        {/* Stack cell — wide, because it carries the most tags */}
        <div
          className="reveal card-quiet p-6 sm:p-7 md:col-span-2 hover:border-amber/40"
          style={{ transitionDelay: "40ms" }}
        >
          <h3 className="text-xl font-extrabold">{stack.title}</h3>
          <p className="mt-2 text-[15px] text-white/60">{stack.blurb}</p>
          <ul className="mt-6 flex flex-wrap gap-2.5">
            {stack.items.map((item) => (
              <li key={item} className="tag">
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Stat pair, stacked into the remaining column */}
        <div className="grid gap-5">
          {[about.facts[1], aiMediaLab.reach].map((stat, i) => (
            <div
              key={stat.label}
              className="reveal card-quiet p-6 sm:p-7 hover:border-amber/40"
              style={{ transitionDelay: `${80 + i * 40}ms` }}
            >
              <span className="block text-4xl font-extrabold text-amber">{stat.value}</span>
              <span className="mt-2 block text-[14px] text-white/60">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
