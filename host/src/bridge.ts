import { ChromeNativeBridge } from "@josephuspaye/chrome-native-bridge"
import { AppCommand, HostCommand } from "@fftext/core"

export default function createBridge(receive: (command: HostCommand) => void) {
  const bridge = new ChromeNativeBridge(
    process.argv,
    process.stdin,
    process.stdout,
    {
      onMessage(message) {
        receive(message)
      },

      onError(err) {
        console.error(err)
      },

      onEnd() {
        process.exit()
      },
    }
  )

  return (command: Omit<AppCommand, "target">) => {
    bridge.emit({ target: "app", ...command })
  }
}