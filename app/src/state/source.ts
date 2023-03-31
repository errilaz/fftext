import { Source } from "@fftext/core"
import { create } from "zustand"

export const useSource = create<{
  source: Source | null
  update: (source: Source) => void
}>(set => ({
  source: null,
  update(source) {
    set({ source })
  }
}))
