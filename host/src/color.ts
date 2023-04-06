import { Ansi, Irc, Palette } from "@fftext/core"
import nearestColor, { FindNearest } from "nearest-color"
import rgbHex from "rgb-hex"

export type RGB = [r: number, g: number, b: number]
export type RGBA = [r: number, g: number, b: number, a: number]

module Color {
  export function find(palette: Palette) {
    switch (palette) {
      case "xterm": return findXterm
      case "ubuntu": return findUbuntu
      case "win10": return findWin10
      case "256": return find256
      default: throw new Error("Inconceivable.")
    }
  }  
}

export default Color

const findXterm = createFind(nearestColor.from(getAnsi16Map(Ansi.xterm)))
const findUbuntu = createFind(nearestColor.from(getAnsi16Map(Ansi.ubuntu)))
const findWin10 = createFind(nearestColor.from(getAnsi16Map(Ansi.win10)))
const find256 = createFind(nearestColor.from(getAnsi256Map()))

function createFind(nearest: FindNearest) {
  const cache: { [hex: string]: RGBA } = {}
  return ([r, g, b]: number[]) => {
    const hex = rgbHex(fix(r), fix(g), fix(b))
    if (!cache[hex]) {
      const { r, g, b } = nearest(hex).rgb
      cache[hex] = [r, g, b, 255]
    }
    return cache[hex]
  }
}

function getAnsi16Map(colors: Ansi.Ansi16Color[]) {
  return Object.fromEntries(colors.map(([fg, , r, g, b]) => [
    fg.toString(),
    rgbHex(fix(r), fix(g), fix(b)),
  ]))
}

function getAnsi256Map() {
  return Object.fromEntries(Ansi.ansi256.map(([code, hex]) => [code.toString(), hex]))
}

function fix(x: number) {
  return Math.max(0, Math.min(255, x))
}