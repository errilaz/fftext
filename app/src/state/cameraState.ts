import { create } from "zustand"

export const useCamera = create<{
  zoom: number
  pan: [number, number]
  zoomIn(factor?: number): void
  zoomOut(factor?: number): void
  setPan(pan: [number, number]): void
  panTo(direction: "left" | "right" | "up" | "down"): void
}>(set => ({
  zoom: 10,
  pan: [0, 0],
  zoomIn(factor) {
    set(({ zoom }) => ({ zoom: zoom + (zoom * (factor ?? 100) / 1000) }))
  },
  zoomOut(factor) {
    set(({ zoom }) => ({ zoom: zoom - (zoom * (factor ?? 100) / 1000) }))
  },
  setPan(pan) {
    set({ pan })
  },
  panTo(direction) {
    set(({ pan: [x, y], zoom }) => {
      let pan: [number, number] = [0, 0]
      if (direction === "left") pan = [x - 20 / zoom, y]
      if (direction === "right") pan = [x + 20 / zoom, y]
      if (direction === "up") pan = [x, y - 20 / zoom]
      if (direction === "down") pan = [x, y + 20 / zoom]
      return { pan }
    })
  },
}))
