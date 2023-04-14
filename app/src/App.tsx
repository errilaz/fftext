import { AppService, HostService } from "@fftext/core"
import { AppShell } from "@mantine/core"
import Sidebar from "./components/Sidebar"
import AppTabs from "./components/AppTabs"
import DropZone from "./components/DropZone"
import { HostProvider } from "./components/HostProvider"
import { useImages, useRender } from "./state"
import { notifications } from "@mantine/notifications"
import { IconClipboardCheck } from "@tabler/icons-react"
import { useClipboard } from "@mantine/hooks"
import { useDebug } from "./state/debugState"
import { File } from "./common"

function App() {
  const updateSource = useImages(state => state.updateSource)
  const updatePreview = useImages(state => state.updatePreview)
  const setInfo = useDebug(state => state.setInfo)
  const { copy } = useClipboard()

  const createApp = ({ updateRender, restoreSource }: HostService): AppService => ({
    updateSource(source) {
      source.path = source.path + `?${Date.now()}`
      updateSource(source)
      const render = useRender.getState().render
      updateRender(render)
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
