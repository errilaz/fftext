const { createHash } = require("crypto")
const { join } = require("path")
const { writeFileSync } = require("fs")

const root = process.env.FFTEXT
const data = process.env.FFTEXT_DATA
const browser = process.env.FFTEXT_BROWSER

const path = join(root, "host", "bin", "host")
const extensionPath = join(root, "ext")
const extensionId = createExtensionHash(extensionPath)
const origin = `chrome-extension://${extensionId}/`
const manifestPath = join(data, browser, "NativeMessagingHosts", "fftext.json")

const hostManifest = {
  path,
  name: "fftext",
  description: "FFText Native Messaging Host",
  type: "stdio",
  allowed_origins: [origin]
}

const json = JSON.stringify(hostManifest, null, 2)

writeFileSync(manifestPath, json, "utf8")
console.log(extensionId)

function createExtensionHash(path) {
  return createHash("sha256")
    .update(Buffer.from(Buffer.from(path, "utf-8"), "base64"))
    .digest("hex")
    .slice(0, 32)
    .split("")
    .map(c => c >= "a"
      ? String.fromCharCode(c.charCodeAt(0) + 10)
      : String.fromCharCode("a".charCodeAt(0) + c.charCodeAt(0) - "0".charCodeAt(0))
    )
    .join("");
}

