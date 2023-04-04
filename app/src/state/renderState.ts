import { Render, Effects, ScalarEffect, ToggleEffect, ToggleEffects, Interpolation } from "@fftext/core"
import { castDraft } from "immer"
import { create } from "zustand"
import { createJSONStorage, persist } from "zustand/middleware"
import { immer } from "zustand/middleware/immer" 

export const useRender = create<{
  render: Render
  interpolate(interpolation: Interpolation): void
  resetEffects(): void
  resetScalar(effect: ScalarEffect): void
  resetToggle(effect: ToggleEffect): void
  adjustScalar(effect: ScalarEffect, value: number): void
  adjustToggle<Effect extends ToggleEffect, Setting extends keyof ToggleEffects[Effect]>(effect: Effect, setting: Setting, value: number): void
  adjustRange<Effect extends ToggleEffect, Lower extends keyof ToggleEffects[Effect], Upper extends keyof ToggleEffects[Effect]>(effect: Effect, lower: Lower, l: number, upper: Upper, u: number): void
  toggle(effect: ToggleEffect, enabled: boolean): void
  changeOption<Option extends keyof Render>(option: Option, value: Render[Option]): void
}>()(
  persist(
    immer(
      set => ({
        render: Render.create(),
        interpolate(interpolation) {
          set(({ render }) => {
            render.interpolation = interpolation
          })
        },
        resetEffects() {
          set(({ render }) => {
            const reset = Render.create().effects
            reset.scalar.width = render.effects.scalar.width
            render.effects = reset
          })
        },
        resetScalar(effect) {
          set(({ render }) => {
            render.effects.scalar[effect] = Effects.scalar[effect].default
          })
        },
        resetToggle(effect) {
          set(({ render }) => {
            render.effects.toggle[effect] = Effects.defaultToggle(effect)
          })
        },
        adjustScalar(effect, value) {
          set(({ render }) => {
            render.effects.scalar[effect] = value
          })
        },
        adjustToggle(effect, setting, value) {
          set(({ render }) => {
            if (!render.effects.toggle[effect].enable) {
              render.effects.toggle[effect].enable = true
            }
            render.effects.toggle[effect][setting] = value as any
          })
        },
        adjustRange(effect, lower, l, upper, u) {
          set(({ render }) => {
            if (!render.effects.toggle[effect].enable) {
              render.effects.toggle[effect].enable = true
            }
            render.effects.toggle[effect][lower] = l as any
            render.effects.toggle[effect][upper] = u as any
          })
        },
        toggle(effect, enable) {
          set((({ render }) => {
            render.effects.toggle[effect].enable = enable
          }))
        },
        changeOption(option, value) {
          set(({ render }) => {
            render[option] = value
          })
        },
      })
    ), {
      name: "render",
      storage: createJSONStorage(() => localStorage),
    }
  )
)
