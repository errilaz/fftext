import { Button, Group, Navbar, Stack, Title } from "@mantine/core";

export default function CommandBar({ openHelp, loadFile }: {
  openHelp(): void
  loadFile(): void
}) {
  return (
    <Navbar.Section>
      <Group position="apart">
        <Title
          size="h2"
          align="left"
        >
          fftext
        </Title>
        <Stack mb="xs">
          <Button.Group>
            <Button onClick={openHelp}>Help</Button>
            <Button onClick={loadFile}>Load</Button>
            <Button>Save</Button>
            <Button>Copy</Button>
          </Button.Group>
        </Stack>
      </Group>
    </Navbar.Section>
  )
}