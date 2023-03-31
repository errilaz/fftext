import { CSSProperties, ReactNode } from "react"

export function Fill({ top, bottom, left, right, gap, style, children }: {
  top?: number
  bottom?: number
  left?: number
  right?: number
  gap?: number
  children?: ReactNode
  style?: CSSProperties
}) {
  return (
    <div style={{
      position: "absolute",
      top: (top ?? gap ?? 0) + "px",
      bottom: (bottom ?? gap ?? 0) + "px",
      left: (left ?? gap ?? 0) + "px",
      right: (right ?? gap ?? 0) + "px",
      ...style,
    }}>
      {children}
    </div>
  )
}

export type DockProps = {
  gap?: number
  style?: CSSProperties
  children?: ReactNode
} & (
  | { position: "left" | "right", width: number, height?: undefined }
  | { position: "top" | "bottom", height: number, width?: undefined  }
)

export function Dock({ position, width, height, gap, style, children }: DockProps) {
  style = { ...style, position: "absolute" }
  if (position === "left" || position === "right") {
    style.top = (gap ?? 0) + "px"
    style.bottom = (gap ?? 0) + "px"
    style[position] = (gap ?? 0) + "px"
    style.width = width
  }
  else {
    style.left = (gap ?? 0) + "px"
    style.right = (gap ?? 0) + "px"
    style[position] = (gap ?? 0) + "px"
    style.height = height
  }
  return (
    <div style={style}>
      {children}
    </div>
  )
}