declare module "image-dither" {
  export = Dither

  class Dither {
    constructor(options?: DitherOptions)
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
    findColor?: (color: number[]) => number[]
    matrix: DitherMatrix
  }

  interface DitherMatrix { }
}

declare module "nearest-color" {
  
}