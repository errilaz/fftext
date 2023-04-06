export type Dithering =
  | "none"
  | "atkinson"
  | "burkes"
  | "floyd-steinberg"
  | "jarvis-judice-ninke"
  | "one-dimensional"
  | "sierra-lite"
  | "sierra2"
  | "sierra3"
  | "stucki"

export module Dithering {
  export const names: Dithering[] = [
    "none",
    "atkinson",
    "burkes",
    "floyd-steinberg",
    "jarvis-judice-ninke",
    "one-dimensional",
    "sierra-lite",
    "sierra2",
    "sierra3",
    "stucki",
  ]
}