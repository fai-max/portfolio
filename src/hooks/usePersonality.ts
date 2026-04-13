"use client";

import { create } from "zustand";

export type Personality = "tech" | "creative" | null;

interface PersonalityState {
  mode: Personality;
  isTransitioning: boolean;
  setMode: (mode: Personality) => void;
  toggle: () => void;
}

export const usePersonality = create<PersonalityState>((set, get) => ({
  mode: null,
  isTransitioning: false,
  setMode: (mode) => {
    if (get().mode === mode) return;
    set({ isTransitioning: true, mode });
    if (typeof document !== "undefined") {
      if (mode) {
        document.documentElement.setAttribute("data-personality", mode);
      } else {
        document.documentElement.removeAttribute("data-personality");
      }
    }
    setTimeout(() => set({ isTransitioning: false }), 800);
  },
  toggle: () => {
    const current = get().mode;
    const next = current === "tech" ? "creative" : "tech";
    get().setMode(next);
  },
}));
