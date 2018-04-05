import { ColorFunction, StarState } from './StarState'

export type DrawState = {
  context: CanvasRenderingContext2D
  stars: StarState[]
  width: number
  height: number
  z: number
  x: number
  y: number
  starLineWidthRatio: number
  speed: number
  starRatio: number
  starSize: number
  strokeStyle: ColorFunction | string
  bgStyle: string
  clear: boolean
  noBackground: boolean
}

export function drawStarField({
  context,
  stars,
  width,
  height,
  z,
  x,
  y,
  starLineWidthRatio,
  speed,
  starRatio,
  starSize,
  strokeStyle,
  bgStyle,
  clear,
  noBackground,
}: DrawState) {
  if (clear) {
    context.clearRect(0, 0, width, height)

    if (!noBackground) {
      context.fillStyle = bgStyle
      context.fillRect(0, 0, width, height)
    }
  }

  let drawStarStep = false

  for (let i = 0; i < stars.length; i++) {
    if (typeof strokeStyle === 'function') {
      context.strokeStyle = strokeStyle()
    }

    let star = stars[i]
    let currentX = star.stepX
    let currentY = star.stepY

    drawStarStep = true
    star.z -= speed

    if (star.z > z) {
      star.z -= z
      drawStarStep = false
    }

    if (star.z < 0) {
      star.z += z
      drawStarStep = false
    }

    star.stepX = x + (star.x / star.z) * starRatio
    star.stepY = y + (star.y / star.z) * starRatio

    drawStarStep = drawStarStep &&
      currentX > 0 && currentX < width &&
      currentY > 0 && currentY < height

    if (drawStarStep) {
      context.beginPath()
      context.lineWidth = (1 - starLineWidthRatio * star.z) * starSize
      context.moveTo(currentX, currentY)
      context.lineTo(star.stepX, star.stepY)
      context.stroke()
      context.closePath()
    }
  }
}
