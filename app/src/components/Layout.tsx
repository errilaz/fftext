import { CSSProperties, ReactNode } from "react"

export function Fill({ top, bottom, left, right, gap, style, children, ...props }: PropsOf<"div"> & {
  top?: number | string
  bottom?: number | string
  left?: number | string
  right?: number | string
  gap?: number | string
  style?: CSSProperties
  children?: ReactNode
}) {
  return (
    <div style={{
      position: "absolute",
      top: length(top) ?? length(gap) ?? 0,
      bottom: length(bottom) ?? length(gap) ?? 0,
      left: length(left) ?? length(gap) ?? 0,
      right: length(right) ?? length(gap) ?? 0,
      ...style,
    }} {...props}>
      {children}
    </div>
  )
}

function length(x: string | number | undefined) {
  if (typeof x === "string") return x
  if (typeof x === "number") return x + "px"
  return undefined
}

export type DockProps = PropsOf<"div"> & {
  gap?: number
  style?: CSSProperties
  children?: ReactNode
} & (
  | { position: "left" | "right", width: number, height?: undefined }
  | { position: "top" | "bottom", height: number, width?: undefined  }
)

export function Dock({ position, width, height, gap, style, children, ...props }: DockProps) {
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
    <div style={style} {...props}>
      {children}
    </div>
  )
}