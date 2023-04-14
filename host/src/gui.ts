import { spawn } from "child_process"
import { dirname } from "path"

export async function selectFile() {
  if (process.platform === "linux") {
    return selectFileLinux()
  }
  throw new Error(`Unsupported platform: ${process.platform}.`)
}

export function notify(summary: string, body?: string) {
  if (process.platform === "linux") {
    spawn("notify-send", [summary, body || ""])
  }
  else {
    throw new Error(`Unsupported platform: ${process.platform}.`)
  }
}

let lastSelectedDirectory: string | undefined

function selectFileLinux(): Promise<string | undefined> {
  return new Promise(resolve => {
    let result: undefined | string = undefined
    const args = [
      "--file-selection",
      "--file-filter", "Images | *.jpg *.jpeg *.png *.webp *.gif *.avif *.tiff *.svg",
    ]
    if (lastSelectedDirectory) {
      args.push("--filename", lastSelectedDirectory + "/")
    }
    const child = spawn("zenity", args)

    child.stdout.on("data", data => {
      result = (result ?? "") + data.toString()
    })

    child.on("close", () => {
      if (result) {
        lastSelectedDirectory = dirname(result.trim())
      }
      resolve(result?.trim())
    })
  })
}