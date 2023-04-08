import { Ansi, Irc, Palette } from "@fftext/core"
import nearestColor, { FindNearest, NearestColor } from "nearest-color"
import rgbHex from "rgb-hex"

export type RGB = [r: number, g: number, b: number]
export type RGBA = [r: number, g: number, b: number, a: number]
export type Layer = "fg" | "bg"

module Color {
  export function find(palette: Palette, layer: Layer, color: RGB): NearestColor {
    switch (palette) {
      case "xterm": return layer === "fg" ? findXtermFG(color) : findXtermBG(color)
      case "ubuntu": return layer === "fg" ? findUbuntuFG(color) : findUbuntuBG(color)
      case "win10": return layer === "fg" ? findWin10FG(color) : findWin10BG(color)
      case "256": return find256(color)
      case "irc16": return findIrc16(color)
      case "irc99": return findIrc99(color)
      default: throw new Error("Inconceivable.")
    }
  }

  export function createFindRGBA(palette: Palette, layer: Layer) {
    return (color: number[]) => {
      const { r, g, b }= find(palette, layer, color as RGB).rgb
      return [r, g, b, 255] as RGBA
    }
  }
}

export default Color

const findXtermFG = createFind(nearestColor.from(getAnsi16Map("fg", Ansi.xterm)))
const findXtermBG = createFind(nearestColor.from(getAnsi16Map("bg", Ansi.xterm)))
const findUbuntuFG = createFind(nearestColor.from(getAnsi16Map("fg", Ansi.ubuntu)))
const findUbuntuBG = createFind(nearestColor.from(getAnsi16Map("bg", Ansi.ubuntu)))
const findWin10FG = createFind(nearestColor.from(getAnsi16Map("fg", Ansi.win10)))
const findWin10BG = createFind(nearestColor.from(getAnsi16Map("bg", Ansi.win10)))
const find256 = createFind(nearestColor.from(getColorMap(Ansi.ansi256)))
const findIrc16 = createFind(nearestColor.from(getColorMap(Irc.irc16)))
const findIrc99 = createFind(nearestColor.from(getColorMap(Irc.irc99)))

function createFind(nearest: FindNearest) {
  const cache: { [hex: string]: NearestColor } = {}
  return ([r, g, b]: number[]) => {
    const hex = rgbHex(fix(r), fix(g), fix(b))
    if (!cache[hex]) {
      const { r, g, b } = nearest(hex).rgb
      cache[hex] = nearest(hex)
    }
    return cache[hex]
  }
}

function getAnsi16Map(layer: Layer, colors: Ansi.Ansi16Color[]) {
  return Object.fromEntries(colors.map(([fg, bg, r, g, b]) => [
    layer === "fg" ? fg.toString() : bg.toString(),
    rgbHex(fix(r), fix(g), fix(b)),
  ]))
}

function getColorMap(colorList: [code: number, hex: string][]) {
  return Object.fromEntries(colorList.map(([code, hex]) => [code.toString(), hex]))
}

function fix(x: number) {
  return Math.max(0, Math.min(255, x))
}

export module RGB {
  export const black: RGB = [0, 0, 0]
  export function is(x: RGB | undefined, y: RGB | undefined) {
    return x?.[0] === y?.[0]
      && x?.[1] === y?.[1]
      && x?.[2] === y?.[2]
  }
}
