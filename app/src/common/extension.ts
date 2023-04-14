import { ExtensionService } from "@fftext/core"

export const extension = new Proxy({}, {
  get(obj, method) {
    return (...parameters: any) => {
      window.postMessage({ target: "extension", method, parameters })
    }
  }
}) as ExtensionService
