import { Dithering } from "./dithering"
import { Complex, Effects, SimpleEffect, ToggleEffect } from "./effects"
import { Interpolation } from "./interpolation"
import { Palette } from "./palette"

export interface Render {
  palette: Palette
  interpolation: Interpolation
  dithering: Dithering
  effects: Effects
  pipeline: (ToggleEffect | "modulate" | "tint")[]
}

export module Render {
  export const create = (): Render => ({
    palette: "256",
    interpolation: "lanczos3",
    dithering: "none",
    effects: {
      width: simpleDefault("width"),
      brightness: simpleDefault("brightness"),
      contrast: simpleDefault("contrast"),
      saturation: simpleDefault("saturation"),
      hue: simpleDefault("hue"),
      lightness: simpleDefault("lightness"),
      red: simpleDefault("red"),
      green: simpleDefault("green"),
      blue: simpleDefault("blue"),
      grayscale: complexDefault("grayscale"),
      gamma: complexDefault("gamma"),
      median: complexDefault("median"),
      sharpen: complexDefault("sharpen"),
      blur: complexDefault("blur"),
      normalize: complexDefault("normalize"),
      clahe: complexDefault("clahe"),
      threshold: complexDefault("threshold"),
    },
    pipeline: [
      "grayscale",
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

function simpleDefault(effect: SimpleEffect) {
  return Effects.config[effect].default
}

function complexDefault<E extends ToggleEffect>(effect: E): Complex<any> & { enable: false } {
  return {
    enable: false,
    ...Object.keys(Effects.config[effect]).reduce((defaults, key) => ({
      ...defaults,
      [key]: (Effects.config[effect] as any)[key].default,
    }), {}),
  } as any
}