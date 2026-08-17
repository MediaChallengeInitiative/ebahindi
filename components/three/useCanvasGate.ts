"use client";

import { useEffect, useRef, useState } from "react";

const REDUCED_QUERY = "(prefers-reduced-motion: reduce)";

/**
 * The 3D is a desktop showpiece only.
 *
 * The primary audience opens this link from WhatsApp and LinkedIn on a phone,
 * and three.js costs ~150KB gzipped plus shader compilation — measurably worse
 * mobile Lighthouse for decoration they see on a 320px circle. Phones get the
 * portrait instead, which is faster *and* more informative.
 */
const DESKTOP_QUERY = "(min-width: 1024px) and (pointer: fine)";

/** Runs `task` when the browser is idle, so the canvas never competes with
 *  first paint. Falls back to a timeout where requestIdleCallback is missing. */
function whenIdle(task: () => void): () => void {
  const ric = (window as unknown as { requestIdleCallback?: typeof requestIdleCallback })
    .requestIdleCallback;

  if (typeof ric === "function") {
    const handle = ric(task, { timeout: 2500 });
    return () =>
      (
        window as unknown as { cancelIdleCallback?: (h: number) => void }
      ).cancelIdleCallback?.(handle as unknown as number);
  }

  const timer = window.setTimeout(task, 1200);
  return () => window.clearTimeout(timer);
}

/** Cached — probing creates a real GL context, so do it at most once. */
let webglSupport: boolean | null = null;

function probeWebGL(): boolean {
  if (webglSupport !== null) return webglSupport;

  try {
    const probe = document.createElement("canvas");
    const gl =
      probe.getContext("webgl2") ??
      probe.getContext("webgl") ??
      probe.getContext("experimental-webgl");
    webglSupport = Boolean(gl);
    // Release the probe context immediately — browsers cap live contexts per page.
    (gl as WebGLRenderingContext | null)?.getExtension("WEBGL_lose_context")?.loseContext();
  } catch {
    webglSupport = false;
  }

  return webglSupport;
}

type Gate = { inView: boolean; supported: boolean; reduced: boolean };

const CLOSED: Gate = { inView: false, supported: false, reduced: false };

/**
 * Decides whether a WebGL canvas may mount, and whether it should animate.
 *
 * Three gates, because eagerly mounting a canvas is the single biggest
 * performance mistake in a portfolio site:
 *  - `inView`    — never build a GL context for a section nobody scrolled to.
 *  - `supported` — probe for a real context; devices without one get the
 *                  static fallback rather than an empty box.
 *  - `reduced`   — honour prefers-reduced-motion with a still frame.
 *
 * All three resolve inside the IntersectionObserver callback. That callback is
 * asynchronous, so this never setStates synchronously from an effect body, and
 * the closed state is what the server renders — meaning the static fallback is
 * always what ships in the HTML.
 */
export function useCanvasGate<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [gate, setGate] = useState<Gate>(CLOSED);

  useEffect(() => {
    const node = ref.current;
    // Without IntersectionObserver the canvas simply never mounts and the
    // static fallback stands in — a fine degradation on very old browsers.
    if (!node || !("IntersectionObserver" in window)) return;
    if (!window.matchMedia(DESKTOP_QUERY).matches) return;

    let cancelIdle: (() => void) | undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          setGate(CLOSED);
          return;
        }
        // Defer the actual mount to idle time so three.js parsing and shader
        // compilation land after first paint rather than blocking it.
        cancelIdle?.();
        cancelIdle = whenIdle(() =>
          setGate({
            inView: true,
            supported: probeWebGL(),
            reduced: window.matchMedia(REDUCED_QUERY).matches,
          }),
        );
      },
      { rootMargin: "200px" },
    );

    observer.observe(node);
    return () => {
      cancelIdle?.();
      observer.disconnect();
    };
  }, []);

  return { ref, ...gate };
}
