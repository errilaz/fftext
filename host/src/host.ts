import { Render } from "@fftext/core"
import sharp, { Sharp } from "sharp"
import createBridge from "./bridge"
import { selectFile } from "./gui"
import openExternal from "open"
import transformPreview from "./preview"
import { resolve } from "path"
import print from "./print"
import { writeFile } from "fs/promises"

let render: Render | undefined
let image: Sharp | undefined
let preview: Sharp | undefined

const app = createBridge({
  async openFile() {
    const path = await selectFile()
    if (!path) return
    image = sharp(path)
    const { width, height } = await image.metadata()
    app.updateSource({ path, width: width!, height: height! })
    refresh()
  },

  async restoreSource(path) {
    image = sharp(path)
    refresh()
  },

  updateRender(update) {
    render = update
    refresh()
  },

  openBrowser(url) {
    openExternal(url)
  },

  async copyText() {
    if (!preview || !render) return
    const text = await print(preview, render)
    const path = resolve(process.env.FFTEXT!, "data", "output.txt")
    await writeFile(path, text, "utf8")
    app.copyText(path)
  },
})

app.hostStarted()

async function refresh() {
  if (!image || !render) return

  try {
    preview = await transformPreview(image, render)
    const path = resolve(process.env.FFTEXT!, "data", "preview.png")
    const { width, height } = await preview.toFile(path)
    app.updatePreview({ path, width, height })
  }
  catch (e) {
    app.error(e)
    console.error(e)
  }
}
