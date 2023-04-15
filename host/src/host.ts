import { resolve } from "path"
import { spawn } from "child_process"
import { writeFile } from "fs/promises"
import sharp, { Sharp } from "sharp"
import { Render } from "@fftext/core"
import openExternal from "open"
import createBridge from "./bridge.js"
import { selectFile } from "./gui.js"
import transformPreview from "./preview.js"
import print from "./print.js"

let render: Render | undefined
let image: Sharp | undefined
let preview: Sharp | undefined

;(process.stdout as any)._handle.setBlocking(true)

const app = createBridge({
  async openFile() {
    const path = await selectFile(false)
    if (!path) return
    image = sharp(path)
    const { width, height } = await image.metadata()
    app.updateSource({ path, width: width!, height: height! })
    refresh()
  },

  async saveAs() {
    const path = await selectFile(true)
    if (!path) return
    app.saveAs(path)
  },

  async save(path: string) {
    if (!preview || !render) return
    const text = await print(preview, render)
    await writeFile(path, text, "utf8")
    app.saved()
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
    const path = resolve(process.env.FFTEXT_DATA!, "output.txt")
    await writeFile(path, text, "utf8")
    app.copyText(path)
  },

  newWindow() {
    spawn(`${process.env.FFTEXT}/fftext`, {
      detached: true
    })
  },

  appConnected() {
    hostStarted()
  },

  async pasteImage(encoded: string) {
    const [prefix, data] = encoded.split(",")
    const [, extension] = /\/(\w+);/.exec(prefix)!
    const buffer = Buffer.from(data, "base64")
    const path = resolve(process.env.FFTEXT_DATA!, `pasted.${extension}`)
    await writeFile(path, buffer)
    image = sharp(path)
    const { width, height } = await image.metadata()
    app.updateSource({ path, width: width!, height: height! })
    refresh()
  },
})

if (process.env.FFTEXT_DEV) {
  hostStarted()
}

let refreshController: AbortController | undefined

async function refresh() {
  if (!image || !render) return

  if (refreshController) {
    refreshController.abort()
  }

  const currentRefresh = refreshController = new AbortController()

  try {
    const newPreview = await transformPreview(image, render, currentRefresh.signal)
    if (!newPreview) return
    preview = newPreview
    if (currentRefresh.signal.aborted) return
    const path = resolve(process.env.FFTEXT_DATA!, "preview.png")
    const { width, height } = await preview.toFile(path)
    if (currentRefresh.signal.aborted) return
    refreshController = undefined
    app.updatePreview({ path, width, height })
  }
  catch (e) {
    app.error(e)
    console.error(e)
  }
}

function hostStarted() {
  app.hostStarted({
    development: process.env.FFTEXT_DEV ?? false,
    "app path": process.env.FFTEXT,
    "data path": process.env.FFTEXT_DATA,
    "node version": process.version,
    "node platform": process.platform,
    browser: process.env.FFTEXT_BROWSER,
    "browser version": process.env.FFTEXT_BROWSER_VERSION,
  })
}