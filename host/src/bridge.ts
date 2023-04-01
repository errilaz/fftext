import { ChromeNativeBridge } from "@josephuspaye/chrome-native-bridge"
import { AppService, Command, HostService } from "@fftext/core"

export default function createBridge(host: HostService) {
  const bridge = new ChromeNativeBridge(
    process.argv,
    process.stdin,
    process.stdout,
    {
      onMessage(message: Command) {
        (host as any)[message.method](...message.parameters)
      },

      onError(err) {
        console.error(err)
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