import { Tabs } from "@mantine/core"
import CropPanel from "./CropPanel"
import RenderPanel from "./RenderPanel"

export default function AppTabs() {
  return (
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
  )
}