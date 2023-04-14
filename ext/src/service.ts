import type { Command, ExtensionService } from "@fftext/core"

let native = chrome.runtime.connectNative("fftext")
let app: chrome.runtime.Port | null = null

native.onMessage.addListener(onMessageFromNative)
native.onDisconnect.addListener(onDisconnectNative)
chrome.runtime.onConnect.addListener(onConnectApp)

console.log("service: loaded")

const service: ExtensionService = {
}

function onMessageFromNative(command: Command) {
  app?.postMessage(command)
}

function onMessageFromApp(command: Command) {
  console.log("from app", command)
  if (command.target === "extension") {
    (service as any)[command.method](...command.parameters)
  }
  else {
    native.postMessage(command)
  }
}

function onConnectApp(port: chrome.runtime.Port) {
  console.log("service: app connected")
  app = port
  app.onMessage.addListener(onMessageFromApp)
  native.postMessage({ target: "host", method: "appConnected", parameters: [] })
}

function onDisconnectNative() {
  console.log("service: native disconnected")
  native.onDisconnect.removeListener(onDisconnectNative)
  native.onMessage.removeListener(onMessageFromNative)
  
  setTimeout(() => {
    native = chrome.runtime.connectNative("fftext")
    native.onMessage.addListener(onMessageFromNative)
    native.onDisconnect.addListener(onDisconnectNative)
  }, 250)
}
