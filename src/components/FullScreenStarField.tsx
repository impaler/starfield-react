import React from 'react'
import { useWindowSize } from '../hooks/useWindowSize'
import { StarField } from './StarField'

const fullScreenStyle = {
  position: 'fixed',
}

export const FullScreenStarField = (props) => {
  const { innerWidth, innerHeight } = useWindowSize()

  return <StarField
    {...{
      ...props,
      style: fullScreenStyle,
      width: innerWidth,
      height: innerHeight,
    }}
  />
}
