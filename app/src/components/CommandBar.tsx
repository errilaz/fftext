import { Button, Group, Menu, Modal, Navbar, Stack, Text, Title } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { notifications } from "@mantine/notifications"
import { IconBug, IconClipboardCheck, IconClipboardCopy, IconCopy, IconDeviceFloppy, IconDoorExit, IconDownload, IconFileDownload, IconFileUpload, IconFilters, IconHelp, IconSquareRoundedX, IconUpload, IconWorld, IconWorldWww } from "@tabler/icons-react"
import { useShortcuts } from "../hooks"
import { useHost } from "./HostProvider"
import fftextPng from "../assets/fftext.png"

export default function CommandBar() {
  const { openFile } = useHost()
  const [helpOpen, { open: openHelp, close: closeHelp }] = useDisclosure(false)
  
  useShortcuts({
    openHelp,
  })

  function copyText() {
    notifications.show({
      title: "fftext",
      message: "Copied to clipboard!",
      icon: <IconClipboardCheck />
    })
  }

  return (
    <Navbar.Section>
      <Modal opened={helpOpen} onClose={closeHelp} title="About fftext" centered>
        <Text>
          Hello there
        </Text>
      </Modal>
      <Stack mb="xs">
        <Group position="apart">
          <img src={fftextPng} width="100px" />
          <Button.Group>
            <Menu
              shadow="xl"
              position="bottom-start" offset={-1}
              width={200}
            >
              <Menu.Target>
                <Button>File</Button>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item
                  icon={<IconUpload size={18} />}
                  onClick={() => openFile()}
                  rightSection={<Text color="dimmed">Ctrl+O</Text>}
                >
                  Open Image
                </Menu.Item>
                <Menu.Item
                  icon={<IconDeviceFloppy size={18} />}
                  rightSection={<Text color="dimmed">Ctrl+S</Text>}
                >
                  Save Text
                </Menu.Item>
                <Menu.Item
                  icon={<IconDownload size={18} />}
                >
                  Save As
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item
                  icon={<IconSquareRoundedX size={18} />}
                  onClick={() => window.close()}
                >
                  Quit
                </Menu.Item>      
              </Menu.Dropdown>
            </Menu>
            <Menu
              shadow="xl"
              position="bottom-start" offset={-1}
              width={200}
            >
              <Menu.Target>
                <Button>Edit</Button>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item
                  icon={<IconCopy size={18} />}
                  rightSection={<Text color="dimmed">Ctrl+C</Text>}
                  onClick={() => copyText()}
                >
                  Copy Text
                </Menu.Item>
                <Menu.Item
                  icon={<IconClipboardCopy size={18} />}
                  rightSection={<Text color="dimmed">Ctrl+V</Text>}
                >
                  Paste Image
                </Menu.Item>
                <Menu.Item
                  icon={<IconFilters size={18} />}
                  rightSection={<Text color="dimmed">Ctrl+R</Text>}
                >
                  Reset Effects
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
            <Menu
              shadow="xl"
              position="bottom-start" offset={-1}
              width={200}
            >
              <Menu.Target>
                <Button>Help</Button>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item
                  icon={<IconWorld size={18} />}
                >
                  Website
                </Menu.Item>
                <Menu.Item
                  icon={<IconBug size={18} />}
                >
                  Report Bug
                </Menu.Item>
                <Menu.Item
                  icon={<IconHelp size={18} />}
                  onClick={openHelp}
                  rightSection={<Text color="dimmed">F1</Text>}
                >
                  About
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Button.Group>
        </Group>
      </Stack>
    </Navbar.Section>
  )
}