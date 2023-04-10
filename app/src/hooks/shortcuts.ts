import { useHotkeys } from "@mantine/hooks"
import { useHost } from "../components/HostProvider"
import { useRender, useCamera } from "../state"

export function useShortcuts({ openHelp }: {
  openHelp(): void
}) {
  const { openFile, copyText, newWindow } = useHost()
  const resetEffects = useRender(state => state.resetEffects)
  const zoomIn = useCamera(state => state.zoomIn)
  const zoomOut = useCamera(state => state.zoomOut)
  const panTo = useCamera(state => state.panTo)

  useHotkeys([
    ["f1", () => openHelp()],
    ["ctrl+o", () => openFile()],
    ["ctrl+r", () => resetEffects()],
    ["ctrl+c", () => copyText()],
    ["ctrl+p", () => {}],
    ["ctrl+s", () => {}],
    ["ctrl+n", () => newWindow()],
    ["-", () => zoomOut()],
    ["=", () => zoomIn()],
    ["ArrowLeft", () => panTo("left")],
    ["ArrowRight", () => panTo("right")],
    ["ArrowUp", () => panTo("up")],
    ["ArrowDown", () => panTo("down")],
    // Disable browser shortcuts
    ["f7", noop],
    ["f12", noop],
    ["ctrl+h", noop],
    ["ctrl+j", noop],
    ["ctrl+u", noop],
    ["ctrl+a", noop],
    ["ctrl+t", noop],
  ])
}

function noop() { }
