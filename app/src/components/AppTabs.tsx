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
        <Tabs.Tab value="crop" disabled>Crop</Tabs.Tab>
        <Tabs.Tab value="original" disabled>Original</Tabs.Tab>
        <Tabs.Tab value="compare" disabled>Compare</Tabs.Tab>
      </Tabs.List>
      <PreviewPanel />
      <CropPanel />
    </Tabs>
  )
}