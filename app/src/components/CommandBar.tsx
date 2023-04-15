import { Button, Group, Menu, Modal, Navbar, Stack, Text } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { IconBug, IconClipboardCopy, IconCopy, IconCrop, IconDeviceFloppy, IconDownload,
  IconFilePlus, IconFilters, IconHelp, IconSettings, IconSquareRoundedX, IconUpload,
  IconWorld } from "@tabler/icons-react"
import { useShortcuts } from "../hooks"
import { useHost } from "./HostProvider"
import { useImages, useRender } from "../state"
import fftextPng from "../assets/fftext.png"
import Preferences from "./Preferences"
import About from "./About"

export default function CommandBar() {
  const source = useImages(state => state.source)
  const { openFile, openBrowser, copyText, newWindow, pasteImage, saveAs } = useHost()
  const [helpOpen, { open: openHelp, close: closeHelp }] = useDisclosure(false)
  const [prefsOpen, { open: openPrefs, close: closePrefs }] = useDisclosure(false)
  const resetEffects = useRender(state => state.resetEffects)
  
  const paste = async () => { 
    const items = await navigator.clipboard.read()
    if (!items[0]) return
    const item = items[0]
    if (!/image\//.test(item.types[0])) return

    const blob = await item.getType(item.types[0])
    const reader = new FileReader()
    reader.onload = reader => {
      pasteImage(reader.target!.result as string)
    }
    reader.readAsDataURL(blob)
  }
  
  useShortcuts({
    openHelp,
  })

  return (
    <Navbar.Section>
      <Modal
        opened={helpOpen}
        onClose={closeHelp}
        size="50%"
        withCloseButton={false}
      >
        <About />
      </Modal>
      <Modal
        title="Preferences"
        opened={prefsOpen}
        onClose={closePrefs}
        size="50%"
        centered
      >
        <Preferences />
      </Modal>
      <Stack mb="xs">
        <Group position="apart">
          <img
            src={fftextPng}
            width="110px"
            draggable={false}
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
                  onClick={() => newWindow()}
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
                  disabled
                >
                  Save Text
                </Menu.Item>
                <Menu.Item
                  icon={<IconDownload size={18} />}
                  onClick={() => saveAs()}
                  disabled={source === null}
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
                  disabled={source === null}
                  onClick={() => copyText()}
                >
                  Copy Text
                </Menu.Item>
                <Menu.Item
                  icon={<IconClipboardCopy size={18} />}
                  rightSection={<Text color="dimmed">Ctrl+V</Text>}
                  onClick={() => paste()}
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
                  disabled
                >
                  Reset Crop
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item
                  icon={<IconSettings size={18} />}
                  onClick={() => openPrefs()}
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
                  disabled
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