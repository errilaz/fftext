import { Interpolation } from "@fftext/core"
import { Select } from "@mantine/core"
import { useRender } from "../state"

export default function SelectInterpolation() {
  const value = useRender(state => state.render.interpolation)
  const changeOption = useRender(state => state.changeOption)

  return (
    <Select
      defaultValue="none"
      style={{ flex: 1 }}
      value={value}
      onChange={value => changeOption("interpolation", value as any)}
      data={Interpolation.names.map(value => ({ value, label: value }))}
    />
  )
}