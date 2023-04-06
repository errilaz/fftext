import { useHotkeys } from "@mantine/hooks"
import { useHost } from "../components/HostProvider"

export function useShortcuts({ openHelp }: {
  openHelp(): void
}) {
  const { openFile } = useHost()

  useHotkeys([
    ["f1", () => openHelp()],
    ["ctrl+o", () => openFile()],
  ])
}