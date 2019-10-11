import React from 'react'
import { useWindowSize } from '../hooks/useWindowSize'
import { StarField, Props } from './StarField'

const fullScreenStyle: React.CSSProperties = {
  position: 'fixed',
  zIndex: -1,
}

export const FullScreenStarField: React.FC<Props> = (props) => {
  const { innerWidth, innerHeight } = useWindowSize()

  return <StarField
    {...{
      ...props,
      style: { ...fullScreenStyle, ...props.style || {} },
      width: innerWidth,
      height: innerHeight,
    }}
  />
}
