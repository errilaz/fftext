import { Effects, ScalarEffect } from "@fftext/core"
import { Grid, NumberInput, Slider, Text } from "@mantine/core"
import { capitalize } from "../common/text"
import { useRender } from "../state"

export default function AdjustScalar({ effect }: {
  effect: ScalarEffect
}) {
  const value = useRender(state => state.render.effects.scalar[effect])
  const adjust = useRender(state => state.adjustScalar)
  const reset = useRender(state => state.resetScalar)

  const { min, max, step, precision, default: defaultValue } = Effects.scalar[effect]
  const label = capitalize(effect)

  return (
    <>
      <Grid.Col span={2}>
        <Text
          size="xs"
          align="center"
          onDoubleClick={() => reset(effect)}
        >
          {label}
        </Text>
      </Grid.Col>
      <Grid.Col span={7}>
        <Slider
          size="sm"
          defaultValue={defaultValue}
          value={value}
          min={min}
          max={max}
          step={step}
          showLabelOnHover
          onChange={value => adjust(effect, value)}
        />
      </Grid.Col>
      <Grid.Col span={2} style={{ minWidth: "70px" }}>
        <NumberInput
          defaultValue={defaultValue}
          onChange={value => adjust(effect, typeof value === "number" ? value : 0)}
          value={value}
          min={min}
          max={max}
          step={step}
          precision={precision}
        />
      </Grid.Col>
    </>
  )
}
