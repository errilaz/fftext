import { Source } from "@fftext/core"
import sharp, { Sharp } from "sharp"
import createBridge from "./bridge"
import { selectFile } from "./gui"

const send = createBridge(command => {
  (actions[command.action] as any)(command)
})

let image: Sharp | undefined

const actions = {
  async openFile() {
    const path = await selectFile()
    if (!path) return
    image = sharp(path)
    const { width, height } = await image.metadata()
    send({ action: "openFile", source: { path, width, height } as Source })
  },
}