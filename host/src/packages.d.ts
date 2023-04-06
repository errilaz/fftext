declare module "image-dither" {
  export = Dither

  class Dither {
    constructor(options?: DitherOptions)

    dither(data: Buffer | number[], width: number, options?: DitherOptions): number[]

    static matrices: {
      atkinson: DitherMatrix
      burkes: DitherMatrix
      floydSteinberg: DitherMatrix
      jarvisJudiceNinke: DitherMatrix
      oneDimensional: DitherMatrix
      sierraLite: DitherMatrix
      sierra2: DitherMatrix
      sierra3: DitherMatrix
      stucki: DitherMatrix
      none: DitherMatrix
    }
  }

  interface DitherOptions {
    step?: number
    channels?: number
    diffusionFactor?: number
    findColor?: (color: [number, number, number, number]) => [number, number, number, number]
    matrix: DitherMatrix
  }

  interface DitherMatrix { }
}

declare module "nearest-color" {
  function from(map: ColorMap): FindNearest;

  type FindNearest = (hex: string) => NearestColor

  interface NearestColor {
    name: string
    value: string
    rgb: { r: number, g: number, b: number }
    distance: number
  }

  interface ColorMap {
    [name: string]: string
  }
}
