import { Palette, Render } from "@fftext/core"
import { Sharp } from "sharp"
import Color, { RGB } from "./color"

type Mode = "ansi" | "irc"

export default async function print(preview: Sharp, { palette }: Render): Promise<string> {
  const mode = getMode(palette)

  const { data, info: { width, height, channels }} = await preview.clone()
    .removeAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true })

  let output = ""
  
  for (let y = 0; y < height; y += 2) {
    let line = ""
    for (let x = 0; x < width; x++) {
      const top = colorAt(x, y)
      let prevTop: RGB | undefined
      let bottom = RGB.black
      let prevBottom = RGB.black
      if (y < height - 1) {
        bottom = colorAt(x, y + 1)
        if (x > 0) {
          prevBottom = colorAt(x - 1, y + 1)
        }
      }
      if (x > 0) {
        prevTop = colorAt(x - 1, y)
      }
      const repeat = RGB.is(top, prevTop) && RGB.is(bottom, prevBottom)
      const solid = RGB.is(top, bottom)

      let char = ""

      if (repeat) {
        if (solid) char += Block.full
        else char += Block.half
      }
      else {
        // Escapes
        if (mode === "irc") {
          char += Escape.irc
          char += Color.find(palette, "fg", top).name
          if (!solid) {
            char += ","
            char += Color.find(palette, "bg", bottom).name
          }
        }
        else if (palette === "256") {
          char += Escape.ansi256fg
          char += Color.find(palette, "fg", top).name
          char += "m"
          if (!solid) {
            char += Escape.ansi256bg
            char += Color.find(palette, "bg", bottom).name
            char += "m"
          }
        }
        else if (palette === "24bit") {
          char += Escape.ansi24fg
          const [r, g, b] = top
          char += `${r};${g};${b}m`
          if (!solid) {
            char += Escape.ansi24bg
            const [r, g, b] = bottom
            char += `${r};${g};${b}m`
          }
        }
        else {
          char += Escape.ansi16
          char += Color.find(palette, "fg", top).name
          if (!solid) {
            char += ";"
            char += Color.find(palette, "bg", bottom).name
          }
          char += "m"
        }

        // Blocks
        if (solid) char += Block.full
        else char += Block.half
      }

      output += char
    }
    if (mode === "ansi") {
      output += Escape.ansiReset
    }
    output += "\r\n"
  }

  return output
  
  function colorAt(x: number, y: number): RGB {
    const index = (y * width + x) * channels
    return [
      data[index],
      data[index + 1],
      data[index + 2],
    ]
  }
}

function getMode(palette: Palette): Mode {
  return ["irc16", "irc99"].includes(palette) ? "irc" : "ansi"
}

module Block {
  export const full = "█"
  export const half = "▀"
}

module Escape {
  export const irc = ""
  export const ansiReset = "\x1b[0m"
  export const ansi16 = "\x1b["
  export const ansi256fg = "\x1b[38;5;"
  export const ansi256bg = "\x1b[48;5;"
  export const ansi24fg = "\x1b[38;2;"
  export const ansi24bg = "\x1b[48;2;"
}