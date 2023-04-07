import { Interpolation, Palette } from "@fftext/core"
import { Flex, Group, Navbar, ScrollArea, SegmentedControl, Select, Stack, Text } from "@mantine/core"
import { ReactNode } from "react"
import AdjustScalar from "./AdjustScalar"
import CommandBar from "./CommandBar"
import EffectsGrid from "./EffectsGrid"
import EffectsTabs from "./EffectsTabs"
import SegmentedOption from "./SegmentedOption"
import SelectDithering from "./SelectDithering"
import SelectInterpolation from "./SelectInterpolation"

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
          <SegmentedOption option="palette" values={Palette.names} />
        </Control>
        <Control>
          <Group>
            <Text w={60}>Interpolation</Text>
            <SelectInterpolation />
          </Group>
        </Control>
        <Control>
          <Group>
            <Text w={60}>Dithering</Text>
            <SelectDithering />
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
