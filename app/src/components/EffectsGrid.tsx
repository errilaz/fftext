import { Grid } from "@mantine/core"
import { ReactNode } from "react"

export default function EffectsGrid({ children }: { children?: ReactNode }) {
  return (
    <Grid grow align="center" columns={12} gutter="xs">
      {children}
    </Grid>
  )
}