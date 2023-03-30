const bridge = chrome.runtime.connect({ name: "fftext" })

window.addEventListener("message", message => {
  if (message.data.target === "host") {
    bridge.postMessage(message.data)
  }
})

bridge.onMessage.addListener(command => {
  window.postMessage(command)
})

console.log("content: loaded!")
