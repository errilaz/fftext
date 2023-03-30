import { spawn } from "child_process"

export async function openFile() {
  if (process.platform === "linux") {
    return openFileLinux()
  }
  throw new Error(`Unsupported platform: ${process.platform}.`)
}

function openFileLinux(): Promise<string | undefined> {
  return new Promise(resolve => {
    let result: undefined | string = undefined
    const child = spawn("zenity", [
      "--file-selection",
      "--file-filter", "Images | *.jpg *.jpeg *.png *.webp *.gif *.avif *.tiff *.svg",
    ])

    child.stdout.on("data", data => {
      result = (result ?? "") + data.toString()
    })

    child.on("close", () => {
      resolve(result?.trim())
    })
  })
}