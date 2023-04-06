export type Palette =
  | "xterm"
  | "win10"
  | "ubuntu"
  | "256"
  | "24bit"
  | "irc16"
  | "irc99"

export type PaletteMode =
  | "ansi"
  | "irc"

export module Palette {
  export const names: Palette[] = [
    "xterm",
    "win10",
    "ubuntu",
    "256",
    "24bit",
    "irc16",
    "irc99",
  ]
}
