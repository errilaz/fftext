import { Button, Group, Modal, Navbar, Stack, Title } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { useHost } from "./HostProvider"

export default function CommandBar() {
  const { openFile } = useHost()
  const [helpOpen, { open: openHelp, close: closeHelp }] = useDisclosure(false)

  return (
    <Navbar.Section>
      <Modal opened={helpOpen} onClose={closeHelp} title="Help" centered>
        lol!!!
      </Modal>
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
            <Button onClick={() => openFile()}>Load</Button>
            <Button>Save</Button>
            <Button>Copy</Button>
          </Button.Group>
        </Stack>
      </Group>
    </Navbar.Section>
  )
}