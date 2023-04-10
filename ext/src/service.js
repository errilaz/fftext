let native = chrome.runtime.connectNative("fftext")
let app = null

native.onMessage.addListener(message => {
  app.postMessage(message)
})

native.onDisconnect.addListener(() => {
  console.log("service: native port disconnected")
  setTimeout(connectNative, 250)
})

chrome.runtime.onConnect.addListener(content => {
  app = content
  console.log("service: app port connected")

  content.onMessage.addListener(message => {
    native.postMessage(message)
  })

  native.postMessage({ target: "host", method: "appConnected", parameters: [] })
})

console.log("service: loaded")
