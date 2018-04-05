import * as React from 'react'
import { useRef, useState } from 'react'
import { useStarField } from './useStarField'
import { createStarsState, StarFieldState } from './StarState'

interface Props {
  width?: number
  height?: number
  count?: number
  speed?: number
  fps?: number
  clear?: boolean
  starRatio?: number
  starSize?: number
  starStyle?: ColorFunction | string
  starShape?: 'butt' | 'round' | 'square'
  bgStyle?: string
  noBackground?: boolean
  className?: string
}

type ColorFunction = () => string

export const StarField: React.FC<Props> = ({
  width,
  height,
  starStyle,
  bgStyle,
  count,
  fps,
  speed,
  starRatio,
  starShape,
  starSize,
  clear,
  noBackground,
  ...restProps
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const stateReference = useRef<StarFieldState>(createStarsState({
    count,
    height,
    width,
  }))

  useStarField(canvasRef, {
    width,
    height,
    starStyle,
    bgStyle,
    count,
    fps,
    speed,
    starRatio,
    starShape,
    starSize,
    clear,
    noBackground,
  }, stateReference)

  return <canvas
    ref={canvasRef}
    {...{ width, height }}
    {...restProps}
  />
}

StarField.defaultProps = {
  width: 300,
  height: 300,
  count: 3000,
  speed: 3,
  starRatio: 356,
  starSize: 1.4,
  starStyle: '#fff',
  starShape: 'round',
  clear: true,
  bgStyle: '#000',
  noBackground: false,
}
