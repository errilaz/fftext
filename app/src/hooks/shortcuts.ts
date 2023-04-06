import { useHotkeys } from "@mantine/hooks"
import { useHost } from "../components/HostProvider"
import { useRender } from "../state"
import { useCamera } from "../state/cameraState"

export function useShortcuts({ openHelp }: {
  openHelp(): void
}) {
  const { openFile } = useHost()
  const resetEffects = useRender(state => state.resetEffects)
  const zoomIn = useCamera(state => state.zoomIn)
  const zoomOut = useCamera(state => state.zoomOut)
  const panTo = useCamera(state => state.panTo)

  useHotkeys([
    ["f1", () => openHelp()],
    ["ctrl+o", () => openFile()],
    ["ctrl+r", () => resetEffects()],
    ["-", () => zoomOut()],
    ["=", () => zoomIn()],
    ["ArrowLeft", () => panTo("left")],
    ["ArrowRight", () => panTo("right")],
    ["ArrowUp", () => panTo("up")],
    ["ArrowDown", () => panTo("down")],
  ])
}