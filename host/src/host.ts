import { readFile } from "fs/promises"
import { parse } from "path"
import createBridge from "./bridge"
import { openFile } from "./gui"

const send = createBridge(async command => {
  if (command.action === "open-file") {
    const path = await openFile()
    if (path) {
      const buffer = await readFile(path)
      const ext = parse(path).ext.substring(1)
      const base64 = buffer.toString("base64")
      const data = `data:image/${ext};base64,${base64}`
      send({ action: "open-file", data })
    }
  }
})
