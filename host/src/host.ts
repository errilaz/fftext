import { resolve } from "path"
import { Effects, Render } from "@fftext/core"
import sharp, { Sharp } from "sharp"
import createBridge from "./bridge"
import { selectFile } from "./gui"

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

  let preview = image.clone()
    .resize({
      width: render.effects.width,
      kernel: render.interpolation,
    })
  
  const modulate = Effects.getModulate(render.effects)
  if (modulate) preview = preview.modulate(modulate)
  
  const path = resolve(process.env.FFTEXT!, "data", "output.png")
  await image.toFile(path)

  app.updatePreview(path)
}
