import { AppService } from "@fftext/core"
import { AppShell } from "@mantine/core"
import { HostProvider } from "./state/host"
import Sidebar from "./components/Sidebar"
import AppTabs from "./components/AppTabs"
import { useSource } from "./state/source"

function App() {
  const updateSource = useSource(state => state.update)

  const service: AppService = {
    updateSource(source) {
      updateSource(source)
    },

    updatePreview() {
      // TODO
    }
  }

  return (
    <HostProvider app={service}>
      <AppShell navbar={<Sidebar />} padding={0}>
        <AppTabs />
      </AppShell>
    </HostProvider>
  )
}

export default App
