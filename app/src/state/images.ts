import { Source } from "@fftext/core"
import { create } from "zustand"

export const useImages = create<{
  source: Source | null
  updateSource: (source: Source) => void
  preview: Source | null
  updatePreview: (preview: Source) => void
}>(set => ({
  source: null,
  updateSource(source) {
    set({ source })
  },
  preview: null,
  updatePreview(preview) {
    set({ preview })
  }
}))
