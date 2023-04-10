import { Table, Tabs } from "@mantine/core"
import { useDebug } from "../state/debugState"

export default function About() {
  const info = useDebug(state => state.info)

  return (
    <Tabs
      defaultValue="about"
      variant="outline"
    >
      <Tabs.List>
        <Tabs.Tab value="about">About</Tabs.Tab>
        <Tabs.Tab value="debug">Debug</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="about">
        hello!
      </Tabs.Panel>
      <Tabs.Panel value="debug">
        <Table>
          <tbody>
            {Object.keys(info).map(key => (
              <tr key={key}>
                <th>{key}</th>
                <td>{String(info[key])}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Tabs.Panel>
    </Tabs>
  )
}