import { Dithering } from "@fftext/core"
import { Select } from "@mantine/core"
import { useRender } from "../state"

export default function SelectDithering() {
  const value = useRender(state => state.render.dithering)
  const changeOption = useRender(state => state.changeOption)

  return (
    <Select
      defaultValue="none"
      style={{ flex: 1 }}
      value={value}
      onChange={value => changeOption("dithering", value as any)}
      data={Dithering.names.map(value => ({ value, label: value }))}
    />
  )
}