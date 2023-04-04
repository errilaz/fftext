import { AppService, Command, HostService } from "@fftext/core"
import { createContext, ReactNode, useContext, useEffect } from "react"
import { useRender } from "../state"
import throttle from "lodash.throttle"

export const HostContext = createContext({} as HostService)

export function useHost() {
  return useContext(HostContext)
}

export function HostProvider({ createApp, children }: {
  createApp: (host: HostService) => AppService
  children?: ReactNode
}) {

  const host = new Proxy({}, {
    get(obj, method) {
      return (...parameters: any) => {
        window.postMessage({ target: "host", method, parameters })
      }
    }
  }) as HostService

  const app = createApp(host)

  useEffect(() => {
    window.addEventListener("message", receive)

    useRender.subscribe(throttle(({ render }) => {
      host.updateRender(render)
    }, 250, { leading: true, trailing: true }))

    return () => {
      window.removeEventListener("message", receive)
    }

    function receive(message: MessageEvent) {
      const command = message.data as Command
      if (command.target === "app") {
        (app as any)[command.method](...command.parameters)
      }
    }
  }, [])

  return (
    <HostContext.Provider value={host}>
      {children}
    </HostContext.Provider>
  )
}
