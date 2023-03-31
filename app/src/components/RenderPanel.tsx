import { Flex, Tabs } from "@mantine/core"
import { useSource } from "../state/source"
import { Fill } from "./Layout"

export default function RenderPanel() {
  const source = useSource(state => state.source)

  return (
    <Tabs.Panel value="render" bg="black" style={{ position: "relative" }}>
      <Fill style={{ overflow: "scroll" }}>
        {source?.path && <img src={`/local-file${source.path}`} />}
      </Fill>
    </Tabs.Panel>
  )
}