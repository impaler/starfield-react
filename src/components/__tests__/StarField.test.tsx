import * as React from 'react'
import { render } from '@testing-library/react'
import { StarField } from '../StarField'
import { FullScreenStarField } from '../FullScreenStarField'

test('renders a canvas without error', () => {
  const { container } = render(<StarField data-testid={'dd'} />)

  expect(container.querySelector('canvas').nodeName).toBe('CANVAS')
})

test('width and height are set on the canvas element', () => {
  const { container } = render(<StarField height={360} width={460} />)
  const element = container.querySelector('canvas')

  expect(element.getAttribute('height')).toBe('360')
  expect(element.getAttribute('width')).toBe('460')
})

test('props are passed down to the canvas element', () => {
  const { container, getByTestId } = render(<StarField data-testid={'passed down'} className={'starfield'} />)
  const element = getByTestId('passed down')

  expect(element.nodeName).toBe('CANVAS')
  expect(container.querySelector('canvas.starfield').nodeName).toBe('CANVAS')
})

test('styles are passed down', () => {
  const customStyle: React.CSSProperties = { color: 'red' }
  const { container } = render(<StarField style={customStyle} />)
  const element = container.querySelector('canvas')

  expect(element.style.color).toBe(customStyle.color)
})

test('Fullscreen styles are passed down and merged', () => {
  const customStyle: React.CSSProperties = { color: 'red' }
  const { container } = render(<FullScreenStarField style={customStyle} />)
  const element = container.querySelector('canvas')

  expect(element.style.color).toBe(customStyle.color)
  expect(element.style.zIndex).toBe('-1')
  expect(element.style.position).toBe('fixed')
})
