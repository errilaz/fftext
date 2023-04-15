import { create } from "zustand";

export const useTarget = create<{
  target: string | null
  setTarget(target: string | null): void
}>(set => ({
  target: null,
  setTarget(target) {
    set({ target }) 
  },
}))