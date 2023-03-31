import { Command, HostCommand } from "@fftext/core"
import { useEffect } from "react"
import { useSource } from "./source"

export type Commands = ReturnType<typeof useCommands>

export function useCommands() {
  const updateSource = useSource(state => state.update)

  useEffect(() => {
    window.addEventListener("message", receive)

    return () => {
      window.removeEventListener("message", receive)
    }

    function receive(message: MessageEvent) {
      const command = message.data as Command
      if (command.target === "app") {
        if (command.action === "openFile") {
          updateSource(command.source)
        }
      }
    }
  }, [])


  const send = (command: Omit<HostCommand, "target">) => {
    window.postMessage({ target: "host", ...command })
  }

  return {
    loadFile() {
      send({ action: "openFile" })
    }
  }
}
