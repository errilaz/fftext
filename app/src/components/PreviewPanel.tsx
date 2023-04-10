import { Tabs } from "@mantine/core"
import { useState, WheelEvent, MouseEvent } from "react"
import { File } from "../common"
import { useImages, useCamera } from "../state"
import { Fill } from "./Layout"

export default function PreviewPanel() {
  const preview = useImages(state => state.preview)
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
      value="preview"
      bg="black"
      style={{
        position: "relative",
        userSelect: "none",
      }}
    >
      <Fill
        style={{
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
        {preview?.path && (
          <img
            draggable={false}
            src={File.url(preview.path)}
            style={{
              transform: `scale(${zoom}) translate(${pan[0]}px, ${pan[1]}px)`,
              imageRendering: "pixelated",
            }}
          />
        )}
      </Fill>
    </Tabs.Panel>
  )
} 