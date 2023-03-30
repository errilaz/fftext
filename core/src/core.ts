export type Command =
| HostCommand
| AppCommand

export type HostCommand =
| HostOpenFile

export interface HostOpenFile {
  target: "host"
  action: "open-file"
}

export type AppCommand =
| AppOpenFile

export interface AppOpenFile {
  target: "app"
  action: "open-file"
  source: Source
}

export interface Source {
  path: string
  width: number
  height: number
}

export interface Render {
  width: number
  palette: Palette
  interpolation: Interpolation
  dithering: Dithering
  effects: Effects
  pipeline: (keyof Effects)[]
}

export type SimpleEffect = keyof {
  [P in keyof Effects as Effects[P] extends number ? P : never]: any
}

export interface Effects {
  // Modulate
  grayscale: boolean
  brightness: number
  contrast: number
  saturation: number
  hue: number
  lightness: number
  // Tint
  red: number
  green: number
  blue: number
  // Isolated effects
  gamma: Effect<number>
  median: Effect<number>
  sharpen: Effect<{ type: "fast" } | { type: "accurate", sigma: number }>
  blur: Effect<{ type: "fast" } | { type: "gaussian", sigma: number }>
  normalize: Effect<{ lower: number, upper: number }>
  clahe: Effect<{ width: number, height: number, maxSlope: number }>
  threshold: Effect<number>
}

export interface Effect<Value> {
  enable: boolean
  value: Value
}

export type Palette =
| "xterm"
| "win10"
| "ubuntu"
| "256"
| "24bit"
| "irc16"
| "irc99"

export type Interpolation =
| "nearest"
| "cubic"
| "mitchell"
| "lanczos2"
| "lanczos3"

export type Dithering =
| "none"
| "atkinson"
| "burkes"
| "floyd-steinberg"
| "jarvis-judice-ninke"
| "one-dimensional"
| "sierra-lite"
| "sierra2"
| "sierra3"
| "stucki"

export module Render {
  export const create = (): Render => ({
    width: 80,
    palette: "256",
    interpolation: "lanczos3",
    dithering: "none",
    effects: {
      grayscale: false,
      modulate: {
        brightness: 0,
        contrast: 0,
        saturation: 0,
        hue: 0,
        lightness: 0,
      },
      tint: {
        red: 0,
        green: 0,
        blue: 0,
      },
      gamma: { enable: false, value: 2.2 },
      median: { enable: false, value: 3 },
      sharpen: { enable: false, value: { type: "fast" } },
      blur: { enable: false, value: { type: "fast" } },
      normalize: { enable: false, value: { lower: 1, upper: 99 } },
      clahe: { enable: false, value: { width: 3, height: 3, maxSlope: 3 } },
      threshold: { enable: false, value: 128 },
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