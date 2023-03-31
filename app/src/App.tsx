import { AppShell, Tabs } from "@mantine/core"
import Sidebar from "./components/Sidebar"
import { useCommands } from "./state/commands"
import RenderPanel from "./components/RenderPanel"
import CropPanel from "./components/CropPanel"

function App() {
  const commands = useCommands()

  return (
    <AppShell
      padding={0}
      style={{ userSelect: "none" }}
      navbar={<Sidebar commands={commands} />}
    >
      <Tabs variant="outline" defaultValue="render" styles={{
        root: {
          height: "100%",
          display: "flex",
          flexDirection: "column",
        },
        panel: { flex: 1 },
      }}>
        <Tabs.List>
          <Tabs.Tab value="render">Render</Tabs.Tab>
          <Tabs.Tab value="crop">Crop</Tabs.Tab>
        </Tabs.List>
        <RenderPanel />
        <CropPanel />
      </Tabs>
    </AppShell>
  )
}

export default App
