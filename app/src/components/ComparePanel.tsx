import { Tabs, useMantineColorScheme, useMantineTheme } from "@mantine/core"
import { useState, WheelEvent, MouseEvent } from "react"
import { useImages } from "../state"
import { useCamera } from "../state/cameraState"
import { Fill } from "./Layout"

export default function ComparePanel() {
  const preview = useImages(state => state.preview)
  const source = useImages(state => state.source)
  const theme = useMantineTheme()

  const zoom = useCamera(state => state.zoom)
  const zoomIn = useCamera(state => state.zoomIn)
  const zoomOut = useCamera(state => state.zoomOut)
  const pan = useCamera(state => state.pan)
  const setPan = useCamera(state => state.setPan)

  const [panning, setPanning] = useState(false)

  const handleWheel = (event: WheelEvent) => {
    if (event.deltaY > 0) zoomOut(event.deltaY)
    else if (event.deltaY < 0) zoomIn(-event.deltaY)
  }

  const handleMouseDown = (event: MouseEvent) => {
    setPanning(true)
  }

  const handleMouseUp = (event: MouseEvent) => {
    setPanning(false)
  }

  const handleMouseMove = (event: MouseEvent) => {
    if (panning) {
      const [x, y] = pan
      setPan([x + event.movementX / zoom, y + event.movementY / zoom])
    }
  }

  return (
    <Tabs.Panel
      value="compare"
      bg="black"
      style={{
        position: "relative",
        userSelect: "none",
      }}
    >
      <Fill
        right="50%"
        style={{
          overflow: "hidden",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRight: `solid 2px ${theme.colors.dark[6]}`,
        }}
        onWheelCapture={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        {preview?.path && (
          <img
            draggable={false}
            src={`/local-file${preview.path}`}
            style={{
              transform: `scale(${zoom}) translate(${pan[0]}px, ${pan[1]}px)`,
              imageRendering: "pixelated",
            }}
          />
        )}
      </Fill>
      <Fill
        left="50%"
        style={{
          borderLeft: `solid 2px ${theme.colors.dark[6]}`,
          overflow: "hidden",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        onWheelCapture={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        {source?.path && preview?.path && (
          <img
            src={`/local-file${source.path}`}
            draggable={false}
            style={{
              transform: `scale(${zoom / (source.width / preview!.width)}) translate(${pan[0] * source.width / preview!.width}px, ${pan[1] * source.width / preview!.width}px)`,
              imageRendering: "pixelated",
            }}
          />
        )}
      </Fill>
    </Tabs.Panel>
  )
} 