import { Center, Stack, Table, Tabs, Text } from "@mantine/core"
import { useDebug } from "../state/debugState"
import fftextPng from "../assets/fftext.png"
import { useHost } from "./HostProvider"
import Link from "./Link"

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
        <Stack
          align="center"
        >
          <img
            src={fftextPng}
            width="400px"
            draggable={false}
            style={{ imageRendering: "pixelated" }}
          />
          <Text
            size="lg"
            align="center"
          >
            by{" "}
            <Link href="https://errilaz.org">errilaz</Link>
            <br /><br />
            <Link href="https://errilaz.org/fftext">Official Website</Link>
            <br />
            <Link href="https://github.com/errilaz/fftext">GitHub</Link>
          </Text>
        </Stack>
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