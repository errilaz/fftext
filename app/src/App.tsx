import { AppService, HostService } from "@fftext/core"
import { AppShell } from "@mantine/core"
import Sidebar from "./components/Sidebar"
import AppTabs from "./components/AppTabs"
import DropZone from "./components/DropZone"
import { HostProvider } from "./components/HostProvider"
import { useDebug, useImages, useRender, useTarget } from "./state"
import { notifications } from "@mantine/notifications"
import { IconClipboardCheck, IconDeviceFloppy } from "@tabler/icons-react"
import { useClipboard } from "@mantine/hooks"
import { File } from "./common"

function App() {
  const updateSource = useImages(state => state.updateSource)
  const updatePreview = useImages(state => state.updatePreview)
  const updateTarget = useTarget(state => state.updateTarget)
  const setInfo = useDebug(state => state.setInfo)
  const { copy } = useClipboard()

  const createApp = ({ updateRender, restoreSource, save }: HostService): AppService => ({
    updateSource(source) {
      source.path = source.path + `?${Date.now()}`
      updateSource(source)
      const render = useRender.getState().render
      updateRender(render)
      updateTarget(null)
    },

    updatePreview(preview) {
      preview.path = preview.path + `?${Date.now()}`
      updatePreview(preview)
    },

    log(...msgs) {
      console.log(...msgs)
    },

    error(...msgs) {
      console.error(...msgs)
    },

    async copyText(path) {
      const text = await File.read(path)
      copy(text)
      notifications.show({
        title: "fftext",
        message: "Copied to clipboard!",
        icon: <IconClipboardCheck />,
      })
    },

    async hostStarted(info) {
      console.log("host started")
      const source = useImages.getState().source
      setInfo(info)
      if (source) {
        await restoreSource(source.path)
        updateRender(useRender.getState().render)
      }
    },

    saveAs(path) {
      updateTarget(path)
      save(path)
    },

    saved() {
      notifications.show({
        title: "fftext",
        message: "Saved!",
        icon: <IconDeviceFloppy />,
      })
    },
  })

  return (
    <HostProvider createApp={createApp}>
      <DropZone>
        <AppShell navbar={<Sidebar />} padding={0}>
          <AppTabs />
        </AppShell>
      </DropZone>
    </HostProvider>
  )
}

export default App
