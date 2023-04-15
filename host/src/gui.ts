import { spawn } from "child_process"
import { dirname } from "path"

export async function selectFile(save: boolean) {
  if (process.platform === "linux") {
    return selectFileLinux(save)
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

let lastOpenedDirectory: string | undefined
let lastSavedDirectory: string | undefined

function selectFileLinux(save: boolean): Promise<string | undefined> {
  return new Promise(resolve => {
    let result: undefined | string = undefined
    const args = [
      "--file-selection",
    ]
    if (save) {
      args.push("--save", "--confirm-overwrite")
    }
    else {
      args.push("--file-filter", "Images | *.jpg *.jpeg *.png *.webp *.gif *.avif *.tiff *.svg")
    }
    if (!save && lastOpenedDirectory) {
      args.push("--filename", lastOpenedDirectory + "/")
    }
    else if (save && lastSavedDirectory) {
      args.push("--filename", lastSavedDirectory + "/")
    }
    const child = spawn("zenity", args)

    child.stdout.on("data", data => {
      result = (result ?? "") + data.toString()
    })

    child.on("close", () => {
      if (result && !save) {
        lastOpenedDirectory = dirname(result.trim())
      }
      else if (result) {
        lastSavedDirectory = dirname(result.trim())
      }
      resolve(result?.trim())
    })
  })
}