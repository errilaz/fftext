import { create } from "zustand"

export const useDebug = create<{
  info: Record<string, any>
  setInfo(info: Record<string, any>): void
}>(set => ({
  info: {},
  setInfo(info) { set({ info })},
}))
