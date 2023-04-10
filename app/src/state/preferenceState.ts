import { MantineThemeColors } from "@mantine/core"
import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"

export const usePreferences = create<{
  scheme: "dark" | "light"
  setScheme: (scheme: "dark" | "light") => void
  color: keyof MantineThemeColors
  setColor: (color: keyof MantineThemeColors) => void
  monitorSource: boolean
}>()(
  persist(set => ({
    scheme: "dark",
    color: "green",
    monitorSource: true,

    setScheme(scheme) {
      set({ scheme })
    },

    setColor(color) {
      set({ color })
    },
  }), {
    name: "preferences",
    storage: createJSONStorage(() => localStorage)
  })
)
