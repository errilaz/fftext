let native = chrome.runtime.connectNative("fftext")
let app = null

native.onMessage.addListener(message => {
  app.postMessage(message)
})

native.onDisconnect.addListener(() => {
  console.log("service: native port disconnected")
  native = chrome.runtime.connectNative("fftext");
});

chrome.runtime.onConnect.addListener(content => {
  app = content
  console.log("service: app port connected")

  content.onMessage.addListener(message => {
    native.postMessage(message)
  })
})

console.log("service: loaded")