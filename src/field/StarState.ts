export interface StarFieldState {
  width: number
  height: number
  x: number
  y: number
  z: number
  stars: StarState[]
}

export interface StarState {
  x: number
  y: number
  z: number
  stepX: number
  stepY: number
}

export type ColorFunction = () => string

export function createStarsState(options: { width: number, height: number, count: number }): StarFieldState {
  let width = options.width
  let height = options.height

  let x = Math.round(width / 2)
  let y = Math.round(height / 2)
  let z = (width + height) / 2

  return {
    stars: createStars(x, y, z, width, height, options.count),
    width,
    height,
    x,
    y,
    z,
  }
}

export function createStars(
  x: number,
  y: number,
  z: number,
  width: number,
  height: number,
  count: number,
) {
  let starPool: StarState[] = []
  for (let i = 0; i < count; i++) {
    starPool.push({
      x: Math.random() * width * 2 - x * 2,
      y: Math.random() * height * 2 - y * 2,
      z: Math.round(Math.random() * z),
      stepX: 0,
      stepY: 0,
    })
  }
  return starPool
}
