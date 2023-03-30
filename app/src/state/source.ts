import { Source } from "@fftext/core"
import { create } from "zustand"

export const useSource = create<{
  source: Source | null
}>(set => ({
  source: null 
}))
