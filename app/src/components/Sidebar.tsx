import { Navbar, SegmentedControl, Select, Stack, Text } from "@mantine/core"
import { ReactNode } from "react"
import { Commands } from "../state/commands"
import AdjustSimpleEffect from "./AdjustSimpleEffect"
import CommandBar from "./CommandBar"
import EffectsGrid from "./EffectsGrid"
import EffectsTabs from "./EffectsTabs"

export default function Sidebar({ commands }: { commands: Commands }) {
  return (
    <Navbar p="xs" width={{ base: 360 }}>
      <CommandBar commands={commands} />
      <Navbar.Section grow mt="xs">
        <EffectsGrid>
          <AdjustSimpleEffect effect="width" />
        </EffectsGrid>
        <Control>
          <Text>Palette</Text>
          <SegmentedControl
            defaultValue="256"
            data={[
              { label: "xterm", value: "xterm" },
              { label: "win10", value: "win10" },
              { label: "ubuntu", value: "ubuntu" },
              { label: "256", value: "256" },
              { label: "24bit", value: "24bit" },
              { label: "irc16", value: "irc16" },
              { label: "irc99", value: "irc99" },
            ]}
          />
        </Control>
        <Control>
          <Text>Interpolation</Text>
          <SegmentedControl
            defaultValue="cubic"
            data={[
              { label: "nearest", value: "nearest" },
              { label: "cubic", value: "cubic" },
              { label: "mitchell", value: "mitchell" },
              { label: "lanczos2", value: "lanczos2" },
              { label: "lanczos3", value: "lanczos3" },
            ]}
          />
        </Control>
        <Control>
          <Text>Dithering</Text>
          <Select
            defaultValue="none"
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
        </Control>
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
    >
      {children}
    </Stack>
  )
}
