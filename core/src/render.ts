import { Dithering } from "./dithering"
import { Toggle, Effects, ToggleEffect } from "./effects"
import { Interpolation } from "./interpolation"
import { Palette } from "./palette"

export interface Render {
  palette: Palette
  interpolation: Interpolation
  dithering: Dithering
  effects: Effects
  pipeline: Transform[]
}

export type Transform =
  | "resize"
  | "modulate"
  | "tint"
  | ToggleEffect

export module Render {
  export const create = (): Render => ({
    palette: "256",
    interpolation: "lanczos3",
    dithering: "none",
    effects: {
      scalar: {
        width: Effects.scalar.width.default,
        brightness: Effects.scalar.brightness.default,
        saturation: Effects.scalar.saturation.default,
        hue: Effects.scalar.hue.default,
        lightness: Effects.scalar.lightness.default,
        red: Effects.scalar.red.default,
        green: Effects.scalar.green.default,
        blue: Effects.scalar.blue.default,
      },
      toggle: {
        grayscale: { enable: false },
        invert: { enable: false },
        gamma: Effects.defaultToggle("gamma"),
        median: Effects.defaultToggle("median"),
        sharpen: Effects.defaultToggle("sharpen"),
        blur: Effects.defaultToggle("blur"),
        normalize: Effects.defaultToggle("normalize"),
        clahe: Effects.defaultToggle("clahe"),
        threshold: Effects.defaultToggle("threshold"),
      },
    },
    pipeline: [
      "grayscale",
      "invert",
      "modulate",
      "tint",
      "gamma",
      "median",
      "sharpen",
      "blur",
      "normalize",
      "clahe",
      "threshold",
    ]
  })
}
