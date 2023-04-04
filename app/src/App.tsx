import { AppService, HostService } from "@fftext/core"
import { AppShell } from "@mantine/core"
import Sidebar from "./components/Sidebar"
import AppTabs from "./components/AppTabs"
import { useImages, useRender } from "./state"
import { HostProvider } from "./components/HostProvider"

function App() {
  const updateSource = useImages(state => state.updateSource)
  const updatePreview = useImages(state => state.updatePreview)

  const createApp = ({ updateRender }: HostService): AppService => ({
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
