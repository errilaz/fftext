import { Render } from "@fftext/core"
import { SegmentedControl } from "@mantine/core"
import { useRender } from "../state"

export default function SegmentedOption<Option extends keyof Pick<Render, "interpolation" | "palette">>({ option, values }: {
  option: Option
  values: Render[Option][]
}) {
  const value = useRender(state => state.render[option])
  const changeOption = useRender(state => state.changeOption)

  return (
    <SegmentedControl
      value={value}
      onChange={value => changeOption(option, value as any)}
      data={values.map(value => ({ value, label: value }))}
    />
  )
}