import { Dithering, Effects, Render } from "@fftext/core"
import Dither from "image-dither"
import sharp, { Sharp } from "sharp"
import Color from "./color.js"

export default async function transformPreview(image: Sharp, render: Render, signal: AbortSignal): Promise<Sharp | undefined> {
  const { scalar, toggle } = render.effects

  let preview = image.clone()
    .resize({
      width: scalar.width,
      kernel: render.interpolation,
    })

  // Effects

  if (toggle.blur.enable) {
    preview = preview.blur(toggle.blur.sigma)
  }

  if (toggle.sharpen.enable) {
    preview = preview.sharpen(toggle.sharpen.sigma)
  }

  if (toggle.median.enable) {
    preview = preview.median(toggle.median.size)
  }

  const modulate = Effects.getModulate(scalar)
  if (modulate) preview = preview.modulate(modulate)

  const tint = Effects.getTint(scalar)
  if (tint) {
    preview = preview.tint({ r: tint.red ?? 0, g: tint.green ?? 0, b: tint.blue ?? 0 })
  }

  if (toggle.normalize.enable) {
    const { lower, upper } = toggle.normalize
    preview = preview.normalize({ lower, upper })
  }

  if (toggle.gamma.enable) {
    preview = preview.gamma(toggle.gamma.value)
  }

  if (toggle.clahe.enable) {
    preview = preview.clahe({
      maxSlope: toggle.clahe.maxSlope,
      width: toggle.clahe.width,
      height: toggle.clahe.height,
    })
  }

  // Dither

  if (render.palette !== "24bit") {
    const { info, data } = await preview
      .clone()
      .raw()
      .toBuffer({ resolveWithObject: true })
    
    if (signal.aborted) return

    const dither = new Dither({
      matrix: matrix(render.dithering),
      channels: info.channels,
      findColor: Color.createFindRGBA(render.palette, "fg"),
    })

    const dithered = dither.dither(data, info.width)

    if (signal.aborted) return
  
    preview = sharp(Uint8Array.from(dithered), { raw: info })
  }

  return preview
}

function matrix(dithering: Dithering) {
  switch (dithering) {
    case "none": return Dither.matrices.none
    case "atkinson": return Dither.matrices.atkinson
    case "burkes": return Dither.matrices.burkes
    case "floyd-steinberg": return Dither.matrices.floydSteinberg
    case "jarvis-judice-ninke": return Dither.matrices.jarvisJudiceNinke
    case "one-dimensional": return Dither.matrices.oneDimensional
    case "sierra-lite": return Dither.matrices.sierraLite
    case "sierra2": return Dither.matrices.sierra2
    case "sierra3": return Dither.matrices.sierra3
    case "stucki": return Dither.matrices.stucki
  }
}
