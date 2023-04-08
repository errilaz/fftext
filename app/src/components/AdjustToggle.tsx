import { EffectConfig, Effects, ToggleEffect, ToggleEffects } from "@fftext/core"
import { Grid, NumberInput, RangeSlider, Slider, Stack, Switch, Text } from "@mantine/core"
import { ChangeEvent, ReactNode } from "react"
import { capitalize } from "../common"
import { useRender } from "../state"

export function AdjustToggle({ effect, children }: {
  effect: ToggleEffect
  children?: ReactNode
}) {
  
  const label = capitalize(effect)
  const reset = useRender(state => state.resetToggle)
  const enable = useRender(state => state.render.effects.toggle[effect].enable)
  const toggle = useRender(state => state.toggle)
  
  const handleToggle = (event: ChangeEvent<HTMLInputElement>) => {
    toggle(effect, event.currentTarget.checked)
  }

  return (<>
    <Grid.Col span={2}>
      <Stack align="center">
        <Text
          size="xs"
          align="center"
          onDoubleClick={() => reset(effect)}
        >
          {label}
        </Text>
        <Switch size="xs" checked={enable} onChange={handleToggle} />
      </Stack>
    </Grid.Col>
    {children}
  </>)
}

export module AdjustToggle {
  export function Value<Effect extends ToggleEffect, Setting extends keyof ToggleEffects[Effect]>({ effect, setting }: {
    effect: Effect
    setting: Setting
  }) {
    const value = useRender(state => state.render.effects.toggle[effect][setting]) as number
    const adjust = useRender(state => state.adjustToggle)

    const { min, max, step, default: defaultValue } = (Effects.toggle[effect] as any)[setting]
  
    return (<>
      <Grid.Col span={7}>
        <Slider
          size="sm"
          defaultValue={defaultValue}
          value={value}
          min={min}
          max={max}
          step={step}
          showLabelOnHover
          onChange={value => adjust(effect, setting, value)}
        />
      </Grid.Col>
      <Grid.Col span={2} style={{ minWidth: "70px" }}>
        <NumberInput
          defaultValue={defaultValue}
          onChange={value => adjust(effect, setting, typeof value === "number" ? value : 0)}
          value={value}
          min={min}
          max={max}
          step={step}
          width={50}
        />
      </Grid.Col>
    </>)
  }

  export function Range<
    Effect extends ToggleEffect,
    Lower extends keyof ToggleEffects[Effect],
    Upper extends keyof ToggleEffects[Effect],
  >({ effect, lower, upper }: {
    effect: Effect
    lower: Lower
    upper: Upper
  }) {
    const lowerValue = useRender(state => state.render.effects.toggle[effect][lower]) as number
    const upperValue = useRender(state => state.render.effects.toggle[effect][upper]) as number
    const adjust = useRender(state => state.adjustRange)

    const lowerConfig = (Effects.toggle[effect] as any)[lower] as EffectConfig
    const upperConfig = (Effects.toggle[effect] as any)[upper] as EffectConfig

    return (<>
      <Grid.Col span={9}>
        <RangeSlider
          size="sm"
          defaultValue={[lowerConfig.default, upperConfig.default]}
          value={[lowerValue, upperValue]}
          min={lowerConfig.min}
          max={upperConfig.max}
          step={lowerConfig.step}
          showLabelOnHover
          onChange={([l, u]) => adjust(effect, lower, l, upper, u)}
        />
      </Grid.Col>
    </>)
  }
}

export default AdjustToggle