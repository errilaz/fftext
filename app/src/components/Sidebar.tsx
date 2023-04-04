import { Flex, Group, Navbar, ScrollArea, SegmentedControl, Select, Stack, Text } from "@mantine/core"
import { ReactNode } from "react"
import AdjustScalar from "./AdjustScalar"
import CommandBar from "./CommandBar"
import EffectsGrid from "./EffectsGrid"
import EffectsTabs from "./EffectsTabs"
import SegmentedOption from "./SegmentedOption"

export default function Sidebar() {
  return (
    <Navbar
      p="xs"
      width={{ base: 360 }}
      style={{
        userSelect: "none",
      }}
    >
      <CommandBar />
      <Navbar.Section mt="xs">
        <EffectsGrid>
          <AdjustScalar effect="width" />
        </EffectsGrid>
        <Control>
          <Text>Palette</Text>
          <SegmentedOption option="palette" values={[
            "xterm",
            "win10",
            "ubuntu",
            "256",
            "24bit",
            "irc16",
            "irc99",
          ]} />
        </Control>
        <Control>
          <Text>Interpolation</Text>
          <SegmentedOption option="interpolation" values={[
            "nearest",
            "cubic",
            "mitchell",
            "lanczos2",
            "lanczos3",
          ]} />
        </Control>
        <Control>
          <Group>
            <Text w={60}>Dithering</Text>
            <Select
              defaultValue="none"  
              style={{ flex: 1 }}
              data={[
                { label: "none", value: "none" },
                { label: "atkinson", value: "atkinson" },
                { label: "burkes", value: "burkes" },
                { label: "floyd-steinberg", value: "floyd-steinberg" },
                { label: "jarvis-judice-ninke", value: "jarvis-judice-ninke" },
                { label: "one-dimensional", value: "one-dimensional" },
                { label: "sierra-lite", value: "sierra-lite" },
                { label: "sierra2", value: "sierra2" },
                { label: "sierra3", value: "sierra3" },
                { label: "stucki", value: "stucki" },
              ]}
            />
          </Group>
        </Control>
      </Navbar.Section>
      <Navbar.Section grow mt="xs" component={ScrollArea}>
        <EffectsTabs />
      </Navbar.Section>
    </Navbar>
  )
}

function Control({ children }: { children: ReactNode }) {
  return (
    <Stack
      align="stretch"
      justify="center"
      mb="xs"
      ta="center"
    >
      {children}
    </Stack>
  )
}
