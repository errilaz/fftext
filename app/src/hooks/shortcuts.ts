import { useHotkeys } from "@mantine/hooks"
import { useHost } from "../components/HostProvider"
import { useRender, useCamera, useTarget } from "../state"

export function useShortcuts({ openHelp, openPrefs }: {
  openHelp(): void
  openPrefs(): void
}) {
  const target = useTarget(state => state.target)
  const { openFile, copyText, newWindow, saveAs, save } = useHost()
  const resetEffects = useRender(state => state.resetEffects)
  const zoomIn = useCamera(state => state.zoomIn)
  const zoomOut = useCamera(state => state.zoomOut)
  const panTo = useCamera(state => state.panTo)

  const handleSave = () => {
    if (target === null) saveAs()
    else save(target)
  }

  useHotkeys([
    ["f1", () => openHelp()],
    ["ctrl+o", () => openFile()],
    ["ctrl+r", () => resetEffects()],
    ["ctrl+c", () => copyText()],
    ["ctrl+p", () => openPrefs()],
    ["ctrl+s", () => handleSave()],
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
