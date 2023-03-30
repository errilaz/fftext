import { AppShell, Navbar, Title, Button, SegmentedControl, Group, Text, Stack,
  Center, Select, Box, Slider, NumberInput, Grid, ScrollArea, Tabs, Flex, ActionIcon, HoverCard, Modal, Divider } from "@mantine/core"
import { useDisclosure } from "@mantine/hooks"
import { IconArrowBackUp } from "@tabler/icons-react"
import { ReactNode, useEffect, useState } from "react"
import Cropper, { Crop } from "react-image-crop"
import { Command, HostCommand } from "@fftext/core"
import "react-image-crop/dist/ReactCrop.css"
import CommandBar from "./components/CommandBar"
import { useRender } from "./state/render"
import { useDebouncedCallback, useThrottledCallback } from "use-debounce"

function App() {
  const [helpOpen, { open: openHelp, close: closeHelp }] = useDisclosure(false)
  const [crop, setCrop] = useState<Crop>()
  const [cropScale, setCropScale] = useState(1)

  const [path, setPath] = useState<string | null>(null)

  useEffect(() => {
    window.addEventListener("message", receive)

    return () => {
      window.removeEventListener("message", receive)
    }

    function receive(message: MessageEvent) {
      const command = message.data as Command
      if (command.target === "app") {
        if (command.action === "open-file") {
          setPath(command.source.path)
        }
      }
    }
  }, [])

  function send(command: Omit<HostCommand, "target">) {
    window.postMessage({ target: "host", ...command })
  }

  function loadFile() {
    send({ action: "open-file" })
  }

  return (
    <AppShell
      padding={0}
      style={{ userSelect: "none" }}
      navbar={
        <Navbar p="xs" width={{ base: 360 }}>
          <CommandBar
            openHelp={openHelp}
            loadFile={loadFile}
          />
          <Navbar.Section grow mt="xs">
            <Grid grow align="center" columns={12} gutter="xs">
              <Grid.Col span={12}>
                <Text>Size</Text>
              </Grid.Col>
              <Adjust
                label="Width"
                property="width"
                defaultValue={60}
                min={8}
                max={300}
                step={1}
              />
            </Grid>
            <Control>
              <Text>Palette</Text>
              <SegmentedControl
                defaultValue="256"
                data={[
                  { label: "xterm", value: "xterm" },
                  { label: "win10", value: "win10" },
                  { label: "ubuntu", value: "ubuntu" },
                  { label: "256", value: "256" },
                  { label: "24bit", value: "24bit" },
                  { label: "irc16", value: "irc16" },
                  { label: "irc99", value: "irc99" },
                ]}
              />
            </Control>
            <Control>
              <Text>Interpolation</Text>
              <SegmentedControl
                defaultValue="cubic"
                data={[
                  { label: "nearest", value: "nearest" },
                  { label: "cubic", value: "cubic" },
                  { label: "mitchell", value: "mitchell" },
                  { label: "lanczos2", value: "lanczos2" },
                  { label: "lanczos3", value: "lanczos3" },
                ]}
              />
            </Control>
            <Control>
              <Text>Dithering</Text>
              <Select
                defaultValue="none"
                data={[
                  { label: "none", value: "none" },
                  { label: "atkinson", value: "atkinson" },
                  { label: "burkes", value: "burkes" },
                  { label: "floyd-steinberg", value: "floyd-steinberg" },
                  { label: "jarvis-judice-ninke", value: "jarvis-judice-ninke" },
                  { label: "one-dimensional", value: "one-dimensional" },
                  { label: "sierra-lite", value: "sierra-lite" },
                  { label: "sierra2", value: "sierra2" },
                  { label: "sierra3", value: "sierra3" },
                  { label: "stucki", value: "stucki" },
                ]}
              />
            </Control>
            <Grid grow align="center" columns={12} gutter="xs">
              <Grid.Col span={12}>
                <Text>Modify</Text>
              </Grid.Col>
              <Brightness />
              <Adjust
                label="Contrast"
                property="contrast"
                defaultValue={0}
                min={-100}
                max={100}
                step={1}
              />
              <Adjust
                label="Saturation"
                property="saturation"
                defaultValue={0}
                min={-100}
                max={100}
                step={1}
              />
              <Adjust
                label="Hue"
                property="hue"
                defaultValue={0}
                min={0}
                max={360}
                step={1}
              />
              <Adjust
                label="Lightness"
                property="lightness"
                defaultValue={0}
                min={-100}
                max={100}
                step={1}
              />
              <Grid.Col span={12}>
                <Text>Tint</Text>
              </Grid.Col>
              <Adjust
                label="Red"
                property="red"
                defaultValue={0}
                min={-255}
                max={255}
                step={1}
              />
              <Adjust
                label="Green"
                property="green"
                defaultValue={0}
                min={-255}
                max={255}
                step={1}
              />
              <Adjust
                label="Blue"
                property="blue"
                defaultValue={0}
                min={-255}
                max={255}
                step={1}
              />
              <Grid.Col span={12}>
                <Text>Effects</Text>
              </Grid.Col>
              <Adjust
                label="Gamma"
                property="gamma"
                defaultValue={2.2}
                min={1}
                max={3}
                step={0.1}
              />
              <Adjust
                label="CLAHE"
                property="clahe"
                defaultValue={2.2}
                min={1}
                max={3}
                step={0.1}
              />
            </Grid>
          </Navbar.Section>
        </Navbar>
      }
    >
      <Modal opened={helpOpen} onClose={closeHelp} title="Help" centered>
        lol
      </Modal>
      <Tabs variant="outline" defaultValue="render" styles={{
        root: {
          height: "100%",
          display: "flex",
          flexDirection: "column",
        },
        panel: { flex: 1 },
      }}>
        <Tabs.List>
          <Tabs.Tab value="render">Render</Tabs.Tab>
          <Tabs.Tab value="crop">Crop</Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="render" bg="black">
          {path && <img src={`/local-file${path}`} />}
        </Tabs.Panel>
        <Tabs.Panel value="crop" bg="black">
          <Flex style={{ width: "100%", height: "100%" }}>
            <div
              style={{
                flex: 1,
                overflow: "scroll",
              }}
              onWheel={event => {
                if (event.deltaY < 0) {
                  setCropScale(scale => scale + 0.1)
                }
                else {
                  setCropScale(scale => scale - 0.1)
                }
              }}
            >
              <Cropper
                crop={crop}
                onChange={crop => setCrop(crop)}
                style={{ transform: `scale(${cropScale})` }}
              >
                {path && <img src={`/local-file${path}`} />}
              </Cropper>
            </div>
            <Divider size="lg" orientation="vertical" color="dark" />
            <div style={{ flex: 1 }}>
            </div>
          </Flex>
        </Tabs.Panel>
      </Tabs>
    </AppShell>
  )
}

export default App

function Control({ children }: { children: ReactNode }) {
  return (
    <Stack
      align="stretch"
      justify="center"
      mb="xs"
    >
      {children}
    </Stack>
  )
}

function Brightness() {
  const brightness = useRender(state => state.render.effects.brightness)
  const adjust = useRender(state => state.adjust)
  const reset = useRender(state => state.resetEffect)

  return (
    <Adjust
      label="Brightness"
      property="brightness"
      defaultValue={0}
      value={brightness}
      onChange={value => adjust("brightness", value)}
      onReset={() => reset("brightness")}
      min={-100}
      max={100}
      step={1}
    />
  )
}

function Adjust({ label, property, defaultValue, min, max, step, value, onChange, onReset }: {
  label: string
  property: string
  defaultValue: number
  value?: number
  min: number
  max: number
  step: number
  onChange?: (value: number) => void
  onReset?: () => void
}) {
  return (
    <>
      <Grid.Col span={2}>
        <HoverCard withArrow>
          <HoverCard.Target>
            <Text size="xs">{label}</Text>
          </HoverCard.Target>
          <HoverCard.Dropdown p="0">
            <Button
              variant="subtle"
              color="dark"
              leftIcon={<IconArrowBackUp />}
              onClick={onReset}
            >
              Reset
            </Button>
          </HoverCard.Dropdown>
        </HoverCard>
      </Grid.Col>
      <Grid.Col span={7}>
        <Slider
          size="sm"
          defaultValue={defaultValue}
          value={value}
          min={min}
          max={max}
          step={step}
          showLabelOnHover
          onChange={onChange}
        />
      </Grid.Col>
      <Grid.Col span={2}>
        <NumberInput
          defaultValue={defaultValue}
          onChange={onChange}
          value={value}
          min={min}
          max={max}
          step={step}
          width={50}
        />
      </Grid.Col>
    </>
  )
}