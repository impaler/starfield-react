export function randomColor ()
{
  const letters = '0123456789ABCDEF'
  const color = Array.apply(
    null,
    new Array(8),
  )
    .map(() => letters[Math.floor(Math.random() * 16)])
    .join('')

  return `#${color}`
}
