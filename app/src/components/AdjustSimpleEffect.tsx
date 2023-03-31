import { Effects, SimpleEffect } from "@fftext/core"
import { Button, Grid, HoverCard, NumberInput, Slider, Text } from "@mantine/core"
import { IconArrowBackUp } from "@tabler/icons-react"
import { capitalize } from "../common/text"
import { useRender } from "../state/render"

export default function AdjustSimpleEffect({ effect }: {
  effect: SimpleEffect
}) {
  const value = useRender(state => state.render.effects[effect])
  const adjust = useRender(state => state.adjust)
  const reset = useRender(state => state.resetEffect)

  const { min, max, step, default: defaultValue } = Effects.config[effect]
  const label = capitalize(effect)

  return (
    <>
      <Grid.Col span={2}>
        <HoverCard withArrow>
          <HoverCard.Target>
            <Text size="xs">{label}</Text>
          </HoverCard.Target>
          <HoverCard.Dropdown p="0">
            <Button
              variant="subtle"
              color="dark"
              leftIcon={<IconArrowBackUp />}
              onClick={() => reset(effect)}
            >
              Reset
            </Button>
          </HoverCard.Dropdown>
        </HoverCard>
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
      <Grid.Col span={2}>
        <NumberInput
          defaultValue={defaultValue}
          onChange={value => adjust(effect, typeof value === "number" ? value : 0)}
          value={value}
          min={min}
          max={max}
          step={step}
          width={50}
        />
      </Grid.Col>
    </>
  )
}
