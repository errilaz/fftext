import { Palette, Render } from "@fftext/core"
import { Sharp } from "sharp"
import Color, { RGB } from "./color"

type Mode = "ansi" | "irc"

export default async function print(preview: Sharp, { palette }: Render): Promise<string> {
  const mode = getMode(palette)
  const findColor = Color.find(palette)

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

      output += [...top].toString() + "\r\n"
    }
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
  const irc = ""
}