import { AppService, Command, HostService } from "@fftext/core"
import { createContext, ReactNode, useContext, useEffect } from "react"
import { useSource } from "./source"

export const HostContext = createContext({} as HostService)

export function useHost() {
  return useContext(HostContext)
}

export function HostProvider({ app, children }: {
  app: AppService
  children?: ReactNode
}) {
  const updateSource = useSource(state => state.update)

  useEffect(() => {
    window.addEventListener("message", receive)

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

  const host = new Proxy({}, {
    get(obj, method) {
      return (...parameters: any) => {
        console.log("posting fucking message")
        window.postMessage({ target: "host", method, parameters })
      }
    }
  }) as HostService

  return (
    <HostContext.Provider value={host}>
      {children}
    </HostContext.Provider>
  )
}
