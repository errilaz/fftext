export interface Effects {
  scalar: ScalarEffects
  toggle: ToggleEffects
}

export type ScalarEffect = keyof ScalarEffects

export interface ScalarEffects {
  // Resize
  width: number
  // Modulate
  lightness: number
  saturation: number
  hue: number
  brightness: number
  // Tint
  red: number
  green: number
  blue: number
}

export type ToggleEffect = keyof ToggleEffects

export interface ToggleEffects {
  grayscale: Toggle
  invert: Toggle
  gamma: Toggle<{ value: number }>
  median: Toggle<{ size: number }>
  sharpen: Toggle<{ sigma: number }>
  blur: Toggle<{ sigma: number }>
  normalize: Toggle<{ lower: number, upper: number }>
  clahe: Toggle<{ width: number, height: number, maxSlope: number }>
}

export type Toggle<Properties = {}> = Properties & {
  enable: boolean
}

export type ScalarConfig = {
  [P in keyof ScalarEffects]: EffectConfig
}

export type ToggleConfig = {
  [P in keyof ToggleEffects]: {
    [V in keyof ToggleEffects[P] as ToggleEffects[P] extends number ? V : never]: EffectConfig
  }
}

export type EffectConfig = {
  default: number
  min: number
  max: number
  step: number
  precision?: number
}

export type Modulate = Partial<Pick<ScalarEffects,
  | "brightness"
  | "saturation"
  | "hue"
  | "lightness"
>>

export type Tint = Partial<Pick<ScalarEffects,
  | "red"
  | "green"
  | "blue"
>>

export module Effects {
  export const scalar: ScalarConfig = {
    width: configure(80, 4, 300, 1),
    brightness: configure(1, 0, 3, 0.05, 2),
    saturation: configure(1, 0, 50, 0.1, 1),
    hue: configure(0, 0, 360, 1),
    lightness: configure(0, -100, 100, 1),
    red: configure(0, 0, 255, 1),
    green: configure(0, 0, 255, 1),
    blue: configure(0, 0, 255, 1),
  }

  export const toggle: ToggleConfig = {
    grayscale: {},
    invert: {},
    gamma: {
      value: configure(2.2, 1, 3, 0.1),
    },
    clahe: {
      width: configure(20, 0, 50, 1),
      height: configure(20, 0, 50, 1),
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
  }

  export function getModulate(effects: ScalarEffects) {
    let modulate: Modulate | undefined
    if (effects.brightness !== Effects.scalar.brightness.default) {
      modulate = { ...modulate, brightness: effects.brightness }
    }
    if (effects.saturation !== Effects.scalar.saturation.default) {
      modulate = { ...modulate, saturation: effects.saturation }
    }
    if (effects.hue !== Effects.scalar.hue.default) {
      modulate = { ...modulate, hue: effects.hue }
    }
    if (effects.lightness !== Effects.scalar.lightness.default) {
      modulate = { ...modulate, lightness: effects.lightness }
    }
    return modulate
  }

  export function getTint(effects: ScalarEffects) {
    let tint: Tint | undefined
    if (effects.red !== Effects.scalar.red.default) {
      tint = { ...tint, red: effects.red }
    }
    if (effects.green !== Effects.scalar.green.default) {
      tint = { ...tint, green: effects.green }
    }
    if (effects.blue !== Effects.scalar.blue.default) {
      tint = { ...tint, blue: effects.blue }
    }
    return tint
  }

  export function defaultToggle<E extends ToggleEffect>(effect: E): Toggle<any> & { enable: false } {
    return {
      enable: false,
      ...Object.keys(Effects.toggle[effect]).reduce((defaults, key) => ({
        ...defaults,
        [key]: (Effects.toggle[effect] as any)[key].default,
      }), {}),
    } as any
  }
}

function configure(defaultValue: number, min: number, max: number, step: number, precision?: number): EffectConfig {
  return {
    default: defaultValue,
    min, max, step, precision
  }
}

