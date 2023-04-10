import { Badge, Box, Flex, Grid, MantineThemeColors, Radio, SegmentedControl, Stack } from "@mantine/core"
import { usePreferences } from "../state"

export default function Preferences() {
  const scheme = usePreferences(state => state.scheme)
  const setScheme = usePreferences(state => state.setScheme)
  const color = usePreferences(state => state.color)
  const setColor = usePreferences(state => state.setColor)

  return (
    <Stack>
      <SegmentedControl
        value={scheme}
        onChange={setScheme}
        transitionDuration={0}
        data={[
          { label: "Dark Mode", value: "dark" },
          { label: "Light Mode", value: "light" },
        ]}
      />
      <Grid m="lg">
        {colors.map(value => (
          <Grid.Col span={2} key={value}>
            <Radio
              label={<ColorLabel color={value} />}
              checked={value === color}
              value={value}
              onChange={event => setColor(event.currentTarget.value)}
            />
          </Grid.Col>
        ))}
      </Grid>
    </Stack>
  )
}

function ColorLabel({ color }: {
  color: keyof MantineThemeColors
}) {
  return (
    <Badge
      color={color}
      variant="filled"
      size="sm"
    >
      {color}
    </Badge>
  )
}

const colors = [
  "dark",
  "gray",
  "red",
  "pink",
  "grape",
  "violet",
  "indigo",
  "blue",
  "cyan",
  "teal",
  "green",
  "lime",
  "yellow",
  "orange",
]
