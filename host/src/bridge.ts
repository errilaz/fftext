import { ChromeNativeBridge } from "@josephuspaye/chrome-native-bridge"
import { AppService, Command, HostService } from "@fftext/core"

export default function createBridge(host: HostService) {
  const bridge = new ChromeNativeBridge(
    process.argv,
    process.stdin,
    process.stdout,
    {
      async onMessage(message: Command) {
        try {
          await (host as any)[message.method](...message.parameters)
        }
        catch (error) {
          console.error(error)
          bridge.emit({ target: "app", method: "error", parameters: [error] })
        }
      },

      onError(error) {
        console.error(error)
        bridge.emit({ target: "app", method: "error", parameters: [error] })
      },

      onEnd() {
        process.exit()
      },
    }
  )

  const service = new Proxy({}, {
    get(obj, method) {
      return (...parameters: any[]) => {
        bridge.emit({ target: "app", method, parameters })
      }
    }
  })

  return service as AppService
}