import { Flex, Tabs } from "@mantine/core"
import { useSource } from "../state/source"

export default function RenderPanel() {
  const source = useSource(state => state.source)

  return (
    <Tabs.Panel value="render" bg="black">
      <Flex justify="center" align="center">
        {source?.path && <img src={`/local-file${source.path}`} />}
      </Flex>
    </Tabs.Panel>
  )
}