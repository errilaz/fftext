export type Interpolation =
  | "nearest"
  | "cubic"
  | "mitchell"
  | "lanczos2"
  | "lanczos3"

export module Interpolation {
  export const all: Interpolation[] = [
    "nearest",
    "cubic",
    "mitchell",
    "lanczos2",
    "lanczos3",
  ]
}
