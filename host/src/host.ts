import { resolve } from "path"
import { Dithering, Effects, Render } from "@fftext/core"
import sharp, { Sharp } from "sharp"
import Dither from "image-dither"
import createBridge from "./bridge"
import { selectFile } from "./gui"
import Color from "./color"

let image: Sharp | undefined
let render: Render | undefined

const app = createBridge({
  async openFile() {
    const path = await selectFile()
    if (!path) return
    image = sharp(path)
    const { width, height } = await image.metadata()
    app.updateSource({ path, width: width!, height: height! })
    refresh()
  },

  updateRender(update) {
    render = update
    refresh()
  },
})

async function refresh() {
  if (!image || !render) return

  const { scalar, toggle } = render.effects

  try {
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

    if (toggle.threshold.enable) {
      preview = preview.threshold(toggle.threshold.value)
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

    // Dither

    if (render.palette !== "24bit") {
      const { info, data } = await preview
        .clone()
        .raw()
        .toBuffer({ resolveWithObject: true })
      
      const dither = new Dither({
        matrix: matrix(render.dithering),
        channels: info.channels,
        findColor: Color.find(render.palette),
      })
      
      const dithered = dither.dither(data, info.width)
      app.log(data.length, dithered.length)
      preview = sharp(Uint8Array.from(dithered), { raw: info })
    }
    
    // Write
  
    const path = resolve(process.env.FFTEXT!, "data", "preview.png")
    const { width, height } = await preview.toFile(path)

    app.updatePreview({ path, width, height })
  }
  catch (e) {
    app.error(e)
    console.error(e)
  }
}

export function matrix(dithering: Dithering) {
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
