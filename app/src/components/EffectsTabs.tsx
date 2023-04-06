import { Button, Grid, Group, HoverCard, Tabs, Text } from "@mantine/core"
import AdjustToggle from "./AdjustToggle"
import AdjustScalar from "./AdjustScalar"
import EffectsGrid from "./EffectsGrid"
import { useRender } from "../state"

export default function EffectsTabs() {
  const resetEffects = useRender(state => state.resetEffects)

  return (
    <Tabs variant="outline" defaultValue="effects">
      <Tabs.List position="center" style={{ zIndex: 10 }}>
        <Tabs.Tab value="effects">Effects</Tabs.Tab>
        <Tabs.Tab value="pipeline" disabled>Pipeline</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="effects" pt="xs" pr="20px">
        <Group position="center">
          <Button
            variant="subtle"
            color="dark"
            compact
            onClick={() => resetEffects()}
          >
            Reset All
          </Button>
        </Group>
        <EffectsGrid>
          <AdjustScalar effect="lightness" />
          <AdjustScalar effect="saturation" />
          <AdjustScalar effect="hue" />
          <AdjustScalar effect="brightness" />
          <AdjustScalar effect="red" />
          <AdjustScalar effect="green" />
          <AdjustScalar effect="blue" />
          <AdjustToggle effect="gamma">
            <AdjustToggle.Value effect="gamma" setting="value" />
          </AdjustToggle>
          <AdjustToggle effect="normalize">
            <AdjustToggle.Range effect="normalize" lower="lower" upper="upper" />
          </AdjustToggle>
          
          {/* <AdjustToggle effect="clahe">
          </AdjustToggle> */}

          <AdjustToggle effect="median">
            <AdjustToggle.Value effect="median" setting="size" />
          </AdjustToggle>
          <AdjustToggle effect="sharpen">
            <AdjustToggle.Value effect="sharpen" setting="sigma" />
          </AdjustToggle>
          <AdjustToggle effect="blur">
            <AdjustToggle.Value effect="blur" setting="sigma" />
          </AdjustToggle>
          <AdjustToggle effect="threshold">
            <AdjustToggle.Value effect="threshold" setting="value" />
          </AdjustToggle>
        </EffectsGrid>
      </Tabs.Panel>
      <Tabs.Panel value="pipeline" pt="xs">
      </Tabs.Panel>
    </Tabs>
  )
}