import { Tabs } from "@mantine/core"
import CropPanel from "./CropPanel"
import PreviewPanel from "./PreviewPanel"

export default function AppTabs() {
  return (
    <Tabs variant="outline" defaultValue="preview" styles={{
      root: {
        height: "100%",
        display: "flex",
        flexDirection: "column",
      },
      panel: { flex: 1 },
    }}>
      <Tabs.List>
        <Tabs.Tab value="preview">Preview</Tabs.Tab>
        <Tabs.Tab value="crop">Crop</Tabs.Tab>
      </Tabs.List>
      <PreviewPanel />
      <CropPanel />
    </Tabs>
  )
}