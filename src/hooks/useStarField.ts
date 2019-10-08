import { MutableRefObject, RefObject, useEffect } from 'react'
import { ColorFunction, createStarsState, StarFieldState } from '../field/StarState'
import { drawStarField } from '../field/drawStarField'

export interface Options {
  count: number
  speed: number
  starRatio: number
  starSize: number
  width: number
  height: number
  starStyle?: ColorFunction | string
  clear: boolean
  starShape: 'butt' | 'round' | 'square'
  bgStyle: string
  fps: number
  noBackground: boolean
}

export function useStarField(
  canvasRef: RefObject<HTMLCanvasElement>,
  options: Options,
  stateReference?: MutableRefObject<StarFieldState>,
) {
  const initialState = stateReference.current || createStarsState({
    count: options.count,
    height: options.height,
    width: options.width,
  })

  if (options.count !== initialState.stars.length) {
    if (initialState.stars.length < options.count) {
      const { stars } = createStarsState({
        count: options.count - initialState.stars.length,
        height: options.height,
        width: options.width,
      })
      initialState.stars = [...initialState.stars, ...stars]
    } else {
      initialState.stars.splice(0, initialState.stars.length - options.count)
    }
  }

  if (options.width !== initialState.width || options.height !== initialState.height) {
    const { stars } = createStarsState({
      count: options.count,
      height: options.height,
      width: options.width,
    })
    initialState.stars = stars
    initialState.width = options.width
    initialState.height = options.height
    initialState.x = Math.round(options.width / 2)
    initialState.y = Math.round(options.height / 2)
    initialState.z = (options.width + options.height) / 2
  }

  useEffect(() => {
    const context = canvasRef.current.getContext('2d')
    const starLineWidthRatio = 1 / initialState.z
    const { speed, starRatio, starSize } = options

    context.strokeStyle = typeof options.starStyle === 'string' && options.starStyle
    context.lineCap = options.starShape

    let animationFrameId

    let fps = options.fps
    const fpsInterval = 1000 / fps
    let then = Date.now()
    let now, elapsed

    animationFrameId = requestAnimationFrame(animateNoLimit)

    function animateNoLimit() {
      animationFrameId = requestAnimationFrame(animateNoLimit)

      if (typeof options.fps === 'number') {
        now = Date.now()
        elapsed = now - then
        if (elapsed < fpsInterval) return
        then = now - (elapsed % fpsInterval)
      }

      drawStarField({
        context,
        speed,
        starRatio,
        starSize,
        starLineWidthRatio,
        strokeStyle: options.starStyle,
        bgStyle: options.bgStyle,
        noBackground: options.noBackground,
        clear: options.clear,
        ...initialState,
      })
    }

    return () => cancelAnimationFrame(animationFrameId)
  }, [options])
}

