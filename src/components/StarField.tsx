import * as React from 'react'
import { useRef } from 'react'
import { useStarField } from '../hooks/useStarField'
import { createStarsState, StarFieldState } from '../field/StarState'

export interface Props {
  // Width is passed through to the html canvas element
  width?: number
  // Height is passed through to the html canvas element
  height?: number
  // To total number of stars created for the animation
  count?: number
  // The speed of travel through the Star Field
  speed?: number
  // The frames per second of the animation draw calls
  fps?: number
  // Clear the canvas on each draw call,
  // when false each draw call remains on the canvas and overlapped by the next
  clear?: boolean
  // The ratio used to determine the size of the entire Star Field
  starRatio?: number
  // The size of the stroke used for drawing each star
  starSize?: number
  // The canvas [strokeStyle](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/strokeStyle)
  // used for drawing each star
  // Also valid, a function that returns the strokeStyle from being invoked,
  // each draw call for special effects like random color
  starStyle?: ColorFunction | string
  // The canvas [lineCap](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/lineCap)
  // used for drawing each star
  starShape?: 'butt' | 'round' | 'square'
  // The canvas [fillStyle](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/fillStyle)
  // used for drawing the background of the canvas
  bgStyle?: string
  // A flag to set no background of fillStyle of the canvas
  noBackground?: boolean
  className?: string
  style?: React.CSSProperties
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
