import { create } from "zustand";

export const useTarget = create<{
  target: string | null
  updateTarget(target: string | null): void
}>(set => ({
  target: null,
  updateTarget(target) {
    set({ target }) 
  },
}))