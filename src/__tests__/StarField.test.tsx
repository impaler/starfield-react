import * as React from 'react'
import { render } from '@testing-library/react'
import { StarField } from '../StarField'

test('renders a canvas without error', () => {
  const { container } = render(<StarField data-testid={'dd'} />)

  expect(container.querySelector('canvas').nodeName).toBe('CANVAS')
})

test('props are passed down to the canvas element', () => {
  const { container, getByTestId } = render(<StarField data-testid={'passed down'} className={'starfield'} />)
  const element = getByTestId('passed down')

  expect(element.nodeName).toBe('CANVAS')
  expect(container.querySelector('canvas.starfield').nodeName).toBe('CANVAS')
})

test('width and height are set on the canvas element', () => {
  const { container } = render(<StarField height={360} width={460} />)
  const element = container.querySelector('canvas')

  expect(element.getAttribute('height')).toBe('360')
  expect(element.getAttribute('width')).toBe('460')
})
