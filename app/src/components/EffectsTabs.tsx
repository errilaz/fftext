import { Tabs } from "@mantine/core"
import AdjustSimpleEffect from "./AdjustSimpleEffect"
import EffectsGrid from "./EffectsGrid"

export default function EffectsTabs() {
  return (
    <Tabs variant="outline" defaultValue="modulate">
      <Tabs.List>
        <Tabs.Tab value="modulate">Modulate</Tabs.Tab>
        <Tabs.Tab value="tint">Tint</Tabs.Tab>
        <Tabs.Tab value="effects">Effects</Tabs.Tab>
        <Tabs.Tab value="pipeline">Pipeline</Tabs.Tab>
      </Tabs.List>
      <Tabs.Panel value="modulate" pt="xs">
        <EffectsGrid>
          <AdjustSimpleEffect effect="lightness" />
          {/* <AdjustSimpleEffect effect="contrast" /> */}
          <AdjustSimpleEffect effect="saturation" />
          <AdjustSimpleEffect effect="hue" />
          <AdjustSimpleEffect effect="brightness" />
        </EffectsGrid>
      </Tabs.Panel>
      <Tabs.Panel value="tint" pt="xs">
        <EffectsGrid>
          <AdjustSimpleEffect effect="red" />
          <AdjustSimpleEffect effect="green" />
          <AdjustSimpleEffect effect="blue" />
        </EffectsGrid>
      </Tabs.Panel>
      <Tabs.Panel value="effects" pt="xs">
        <EffectsGrid>
          {/* <Adjust
            label="Gamma"
            defaultValue={2.2}
            min={1}
            max={3}
            step={0.1}
          />
          <Adjust
            label="CLAHE"
            defaultValue={2.2}
            min={1}
            max={3}
            step={0.1}
          /> */}
        </EffectsGrid>
      </Tabs.Panel>
    </Tabs>
  )
}