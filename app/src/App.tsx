import { AppService, HostService } from "@fftext/core"
import { AppShell } from "@mantine/core"
import Sidebar from "./components/Sidebar"
import AppTabs from "./components/AppTabs"
import { useImages, useRender } from "./state"
import { HostProvider } from "./components/HostProvider"
import { notifications } from "@mantine/notifications"
import { IconClipboardCheck } from "@tabler/icons-react"
import { useClipboard } from "@mantine/hooks"
import { request } from "./common"

function App() {
  const updateSource = useImages(state => state.updateSource)
  const updatePreview = useImages(state => state.updatePreview)
  const { copy } = useClipboard()

  const createApp = ({ updateRender, restoreSource }: HostService): AppService => ({
    updateSource(source) {
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
      const text = await request(`/local-file${path}`)
      copy(text)
      notifications.show({
        title: "fftext",
        message: "Copied to clipboard!",
        icon: <IconClipboardCheck />
      })
    },

    async hostStarted() {
      console.log("host started")
      const source = useImages.getState().source
      if (source) {
        await restoreSource(source.path)
        updateRender(useRender.getState().render)
      }
    },
  })

  return (
    <HostProvider createApp={createApp}>
      <AppShell navbar={<Sidebar />} padding={0}>
        <AppTabs />
      </AppShell>
    </HostProvider>
  )
}

export default App
