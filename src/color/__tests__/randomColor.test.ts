import { randomColor } from '../randomColor'

test('a random hex color string', () => {
  expectColor(randomColor())
})

test('a new color on each call', () => {
  const firstColor = randomColor()
  const secondColor = randomColor()

  expectColor(secondColor)
  expectColor(firstColor)
  expect(firstColor).not.toBe(secondColor)
})

const expectColor = (color: any) => {
  expect(typeof color).toBe('string')
  expect(color.length).toBe(7)
  expect(/^#?([0-9A-F]{3}|[0-9A-F]{6})$/i.test(color)).toBe(true)
}
