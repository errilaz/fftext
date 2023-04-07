import { Button, Group, Menu, Modal, Navbar, Stack, Text, Title } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { notifications } from "@mantine/notifications"
import { IconBug, IconClipboardCheck, IconClipboardCopy, IconCopy, IconCrop, IconDeviceFloppy, IconDoorExit, IconDownload, IconFileDownload, IconFilePlus, IconFileUpload, IconFilters, IconHelp, IconSettings, IconSquareRoundedX, IconUpload, IconWorld, IconWorldWww } from "@tabler/icons-react"
import { useShortcuts } from "../hooks"
import { useHost } from "./HostProvider"
import fftextPng from "../assets/fftext.png"
import { useRender } from "../state"

export default function CommandBar() {
  const { openFile, openBrowser, copyText } = useHost()
  const [helpOpen, { open: openHelp, close: closeHelp }] = useDisclosure(false)
  const resetEffects = useRender(state => state.resetEffects)
  
  useShortcuts({
    openHelp,
  })

  return (
    <Navbar.Section>
      <Modal opened={helpOpen} onClose={closeHelp} title="About fftext" centered>
        <Text>
          Hello there
        </Text>
      </Modal>
      <Stack mb="xs">
        <Group position="apart">
          <img
            src={fftextPng}
            width="110px"
            style={{ imageRendering: "pixelated" }}
          />
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
                  icon={<IconFilePlus size={18} />}
                  rightSection={<Text color="dimmed">Ctrl+N</Text>}
                >
                  New Window
                </Menu.Item>
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
                  Save Text As
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
                <Menu.Divider />
                <Menu.Item
                  icon={<IconFilters size={18} />}
                  onClick={() => resetEffects()}
                  rightSection={<Text color="dimmed">Ctrl+R</Text>}
                >
                  Reset Effects
                </Menu.Item>
                <Menu.Item
                  icon={<IconCrop size={18} />}
                  onClick={() => {}}
                >
                  Reset Crop
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item
                  icon={<IconSettings size={18} />}
                  onClick={() => resetEffects()}
                  rightSection={<Text color="dimmed">Ctrl+P</Text>}
                >
                  Preferences
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
                  onClick={() => openBrowser("https://errilaz.org/fftext")}
                >
                  Website
                </Menu.Item>
                <Menu.Item
                  icon={<IconBug size={18} />}
                  onClick={() => openBrowser("https://github.com/errilaz/fftext/issues")}
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