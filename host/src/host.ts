import { Source } from "@fftext/core"
import sharp, { Sharp } from "sharp"
import createBridge from "./bridge"
import { openFile } from "./gui"

let image: Sharp | undefined

const send = createBridge(async command => {
  if (command.action === "open-file") {
    const path = await openFile()
    if (path) {
      image = sharp(path)
      const { width, height } = await image.metadata()
      send({ action: "open-file", source: { path, width, height } as Source })
    }
  }
})

