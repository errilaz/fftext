import { ReactNode, useEffect } from "react"
import { useHost } from "./HostProvider"

export default function DropZone({ children }: { children: ReactNode }) {
  const { pasteImage } = useHost()

  useEffect(() => {
    document.addEventListener("paste", handlePaste)
    document.addEventListener("drop", handleDrop)
    document.addEventListener("dragover", handleDragOver)
    return () => {
      document.removeEventListener("paste", handlePaste)
      document.removeEventListener("drop", handleDrop)
      document.removeEventListener("dragover", handleDragOver)
    }
  })

  function handleDragOver(event: DragEvent) {
    event.preventDefault()
  }

  function handlePaste(event: ClipboardEvent) {
    event.preventDefault()
    event.stopPropagation()
    if (!event.clipboardData) return
    sendData(event.clipboardData)
  }
  
  function handleDrop(event: DragEvent) {
    event.preventDefault()
    event.stopPropagation()
    if (!event.dataTransfer) return
    sendData(event.dataTransfer)
  }

  function sendData(data: DataTransfer) {
    const { items, files } = data
    let file: File | null = null
    if (files.length) {
      file = files[0]
    }
    else if (items.length) {
      const item = items[0]
      if (!/images\//.test(item.type)) return
      file = item.getAsFile()
    }
    if (!file) return

    const reader = new FileReader()
    reader.onload = reader => {
      pasteImage(reader.target!.result as string)
    }
    reader.readAsDataURL(file)
  }

  return <>{children}</>
}
