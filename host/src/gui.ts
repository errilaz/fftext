import { spawn } from "child_process"

export async function selectFile() {
  if (process.platform === "linux") {
    return selectFileLinux()
  }
  throw new Error(`Unsupported platform: ${process.platform}.`)
}

function selectFileLinux(): Promise<string | undefined> {
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