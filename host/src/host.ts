import { Effects, Render, Source } from "@fftext/core"
import sharp, { Sharp } from "sharp"
import createBridge from "./bridge"
import { selectFile } from "./gui"
import { resolve } from "path"

const send = createBridge(command => {
  (actions[command.action] as any)(command)
})

let image: Sharp | undefined
let render: Render | undefined

const actions = {
  async openFile() {
    const path = await selectFile()
    if (!path) return
    image = sharp(path)
    const { width, height } = await image.metadata()
    send({ action: "openFile", source: { path, width, height } as Source })
  },

  async refresh() {
    if (!image || !render) return

    let preview = image.clone()
      .resize({
        width: render.effects.width,
        kernel: render.interpolation,
      })
    
    const modulate = Effects.getModulate(render.effects)
    if (modulate) {
      preview = preview.modulate(modulate)
    }
    
    const path = resolve(process.env.FFTEXT!, "data", "output.png")
    await image.toFile(path)
    send({ action: "rendered", path })
  },
}
