import { Tabs } from "@mantine/core"
import { useState, WheelEvent, MouseEvent } from "react"
import { useImages } from "../state"
import { Fill } from "./Layout"

export default function PreviewPanel() {
  const preview = useImages(state => state.preview)
  const [scale, setScale] = useState(10)
  const [panning, setPanning] = useState(false)
  const [pan, setPan] = useState([0, 0])

  const handleWheel = (event: WheelEvent) => {
    if (event.deltaY > 0) {
      setScale(s => s - (s / 10))
    }
    else if (event.deltaY < 0) {
      setScale(s => s + (s / 10))
    }
  }

  const handleMouseDown = (event: MouseEvent) => {
    setPanning(true)
  }

  const handleMouseUp = (event: MouseEvent) => {
    setPanning(false)
  }

  const handleMouseMove = (event: MouseEvent) => {
    if (panning) {
      setPan(([x, y]) => [x + event.movementX / scale, y + event.movementY / scale])
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
            src={`/local-file${preview.path}`}
            style={{
              transform: `scale(${scale}) translate(${pan[0]}px, ${pan[1]}px)`,
              imageRendering: "pixelated",
            }}
          />
        )}
      </Fill>
    </Tabs.Panel>
  )
} 