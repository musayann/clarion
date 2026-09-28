"use client";

import { useSyncExternalStore } from "react";

/**
 * One shared <audio> element for the whole page, so starting a clip always
 * stops the one before it. Components subscribe to know which clip is playing.
 */
let audio: HTMLAudioElement | null = null;
let current: string | null = null;
let queue: string[] = [];
let gapTimer: ReturnType<typeof setTimeout> | undefined;
const listeners = new Set<() => void>();

const emit = () => listeners.forEach((l) => l());

function setCurrent(src: string | null) {
  current = src;
  emit();
}

function element(): HTMLAudioElement {
  if (!audio) {
    audio = new Audio();
    audio.preload = "none";
    audio.addEventListener("ended", () => {
      const next = queue.shift();
      if (next) {
        gapTimer = setTimeout(() => start(next), 350);
      } else {
        setCurrent(null);
      }
    });
    audio.addEventListener("error", () => {
      queue = [];
      setCurrent(null);
    });
  }
  return audio;
}

function start(src: string) {
  const el = element();
  el.src = src;
  setCurrent(src);
  el.play().catch(() => setCurrent(null));
}

/** Play one or more clips in sequence, interrupting anything already playing. */
export function play(...srcs: string[]) {
  stop();
  const [first, ...rest] = srcs;
  if (!first) return;
  queue = rest;
  start(first);
}

export function stop() {
  clearTimeout(gapTimer);
  queue = [];
  if (audio) {
    audio.pause();
    audio.currentTime = 0;
  }
  setCurrent(null);
}

const subscribe = (l: () => void) => {
  listeners.add(l);
  return () => listeners.delete(l);
};

/** The src currently playing, or null. */
export function useNowPlaying(): string | null {
  return useSyncExternalStore(
    subscribe,
    () => current,
    () => null,
  );
}
