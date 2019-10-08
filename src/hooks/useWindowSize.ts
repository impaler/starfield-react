import { useEffect, useState } from 'react'

export interface WindowSize {
  innerHeight: number
  innerWidth: number
  outerHeight: number
  outerWidth: number
}

function getWindowSize(): WindowSize {
  return {
    innerHeight: window.innerHeight,
    innerWidth: window.innerWidth,
    outerHeight: window.outerHeight,
    outerWidth: window.outerWidth,
  }
}

export function useWindowSize(): WindowSize {
  let [windowSize, setWindowSize] = useState(getWindowSize())

  function handleResize() {
    setWindowSize(getWindowSize())
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return windowSize
}
