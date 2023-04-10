import { Env } from "./env"
import { Web } from "./web"

export module File {
  export function url(path: string) {
    if (Env.development) {
      return `/local-file${path}`
    }
    else {
      return `file://${path}`
    }
  }

  export async function read(path: string) {
    return Web.get(File.url(path))
  }
}