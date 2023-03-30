import { SimpleEffect, Render, Effects } from "@fftext/core"
import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"
import { immer } from "zustand/middleware/immer" 

export const useRender = create<{
  render: Render
  resetAll: () => void
  resetEffect: (key: keyof Effects) => void
  adjust: (key: SimpleEffect, value: number) => void
}>()(
  persist(
    immer(
      set => ({
        render: Render.create(),
        resetAll() {
          set(() => ({ render: Render.create() }))
        },
        resetEffect(key) {
          set(({ render }) => {
            render.effects[key] = Render.create().effects[key] as never
          })
        },
        adjust(key, value) {
          set((({ render }) => {
            render.effects[key] = value
          }))
        },
      })
    ), {
      name: "render",
      storage: createJSONStorage(() => localStorage),
    }
  )
)
