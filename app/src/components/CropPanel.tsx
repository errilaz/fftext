import Cropper, { Crop } from "react-image-crop"
import { Divider, Flex, Tabs } from "@mantine/core"
import { useState } from "react"
import { useImages } from "../state"

export default function CropPanel() {
  const source = useImages(state => state.source)
  const [crop, setCrop] = useState<Crop>()
  const [cropScale, setCropScale] = useState(1)

  return (
    <Tabs.Panel
      value="crop"
      bg="black"
    >
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
            {source?.path && <img src={`/local-file${source.path}`} />}
          </Cropper>
        </div>
        <Divider size="lg" orientation="vertical" color="dark" />
        <div style={{ flex: 1 }}>
        </div>
      </Flex>
    </Tabs.Panel>
  )
}