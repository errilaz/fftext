export interface Effects {
  width: number
  // Modulate
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
  grayscale: Complex<{}>
  gamma: Complex<{ value: number }>
  median: Complex<{ size: number }>
  sharpen: Complex<{ sigma: number }>
  blur: Complex<{ sigma: number }>
  normalize: Complex<{ lower: number, upper: number }>
  clahe: Complex<{ width: number, height: number, maxSlope: number }>
  threshold: Complex<{ value: number }>
}

export type Complex<Properties> = Properties & {
  enable: boolean
}

export type SimpleEffectMap<To> = {
  [P in keyof Effects as Effects[P] extends number ? P : never]: To
}

export type SimpleEffect = keyof SimpleEffectMap<any>

export type ToggleEffectMap<To> = {
  [P in keyof Effects as Effects[P] extends Complex<any> ? P : never]: To
}

export type ToggleEffect = keyof ToggleEffectMap<any>


export type EffectConfig = {
  default: number
  min: number
  max: number
  step: number
}

export type ToggleEffectsConfig = {
  [P in keyof Effects as Effects[P] extends Complex<any> ? P : never]: {
    [V in keyof Effects[P]as Effects[P][V] extends number ? V : never]: EffectConfig
  }
}

export type Modulate = Partial<Pick<Effects,
  | "brightness"
  | "contrast"
  | "saturation"
  | "hue"
  | "lightness"
>>

export module Effects {
  export const config:
    & SimpleEffectMap<EffectConfig>
    & ToggleEffectsConfig
    = {
    width: configure(80, 4, 300, 1),
    brightness: configure(0, -100, 100, 1),
    contrast: configure(0, -100, 100, 1),
    saturation: configure(0, -100, 100, 1),
    hue: configure(0, 0, 360, 1),
    lightness: configure(0, -100, 100, 1),
    red: configure(0, -255, 255, 1),
    green: configure(0, -255, 255, 1),
    blue: configure(0, -255, 255, 1),
    grayscale: false,
    gamma: {
      value: configure(2.2, 1, 3, 0.1),
    },
    clahe: {
      width: configure(3, 0, 50, 1),
      height: configure(3, 0, 50, 1),
      maxSlope: configure(3, 0, 100, 1),
    },
    median: {
      size: configure(3, 1, 50, 1),
    },
    sharpen: {
      sigma: configure(2, 0.000001, 10, 0.001),
    },
    blur: {
      sigma: configure(2, 0.3, 1000, 0.1),
    },
    normalize: {
      lower: configure(1, 0, 100, 1),
      upper: configure(99, 0, 100, 1),
    },
    threshold: {
      value: configure(128, 0, 255, 1),
    }
  }

  export function getModulate(effects: Effects) {
    const modulate: Modulate = {}
    if (effects.brightness !== Effects.config.brightness.default) {
      modulate.brightness = effects.brightness
    }
    if (effects.contrast !== Effects.config.contrast.default) {
      modulate.contrast = effects.contrast
    }
    if (effects.saturation !== Effects.config.saturation.default) {
      modulate.saturation = effects.saturation
    }
    if (effects.hue !== Effects.config.hue.default) {
      modulate.hue = effects.hue
    }
    if (effects.lightness !== Effects.config.lightness.default) {
      modulate.lightness = effects.lightness
    }
    return modulate
  }
}

function configure(defaultValue: number, min: number, max: number, step: number) {
  return {
    default: defaultValue,
    min, max, step
  }
}

