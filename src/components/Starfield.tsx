import * as React from 'react'
import * as ReactDOM from 'react-dom'

export interface StarfieldProps
{
  count?: number
  speed?: number
  starRatio?: number
  starSize?: number
  width?: number
  height?: number
  interval?: number
  starStyle?: string
  bgStyle?: string
  className?: string
}

export interface StarfieldState
{
  width: number
  height: number
  x: number
  y: number
  z: number
  stars: Star[]
}

export type Star = {
  x: number
  y: number
  z: number
  stepX: number
  stepY: number
}

export class Starfield extends React.Component<StarfieldProps, StarfieldState>
{
  private _requestID: number
  private _starCanvas

  constructor (props: StarfieldProps)
  {
    super(props)
    // todo React 16.3 createRef() api has not made
    // it into the Typescript @types/react yet :(
    this._starCanvas = React['createRef']()
    this.state = Starfield.createState(props)
  }

  static defaultProps = {
    count: 3000,
    speed: 3,
    starRatio: 356,
    starSize: 1.4,
    width: 300,
    height: 300,
    interval: 100,
    bgStyle: 'rgb(0,0,0)',
    starStyle: 'rgb(255,255,255)',
  }

  static createState (nextProps: StarfieldProps): StarfieldState
  {
    let width = nextProps.width
    let height = nextProps.height

    let x = Math.round(width / 2)
    let y = Math.round(height / 2)
    let z = (width + height) / 2

    return {
      stars: Starfield.createStars(x, y, z, width, height, nextProps.count),
      width,
      height,
      x,
      y,
      z,
    }
  }

  static createStars (
    x: number, y: number, z: number, width: number, height: number,
    count: number,
  )
  {
    let starPool: Star[] = []
    for (let i = 0; i < count; i++) {
      starPool.push({
        x: Math.random() * width * 2 - x * 2,
        y: Math.random() * height * 2 - y * 2,
        z: Math.round(Math.random() * z),
        stepX: 0,
        stepY: 0,
      })
    }
    return starPool
  }

  componentDidUpdate ()
  {
    clearInterval(this._requestID)
    this.renderStars()
  }

  componentWillReceiveProps (nextProps: StarfieldProps)
  {
    this.setState(Starfield.createState(nextProps))
  }

  componentWillUnmount ()
  {
    clearInterval(this._requestID)
  }

  componentDidMount ()
  {
    this.renderStars()
  }

  render ()
  {
    return (
      <canvas
        className={this.props.className}
        ref={this._starCanvas}
        width={this.state.width}
        height={this.state.height}
      />
    )
  }

  renderStars ()
  {
    const { width, height, x, y, z, stars } = this.state
    const canvasElement = ReactDOM.findDOMNode(
      this._starCanvas.current as any,
    ) as HTMLCanvasElement
    const context = canvasElement.getContext('2d')
    const starLineWidthRatio = 1 / z

    canvasElement.width = width
    canvasElement.height = height
    context.fillStyle = this.props.bgStyle
    context.strokeStyle = this.props.starStyle
    context.lineCap = 'round'

    this._requestID = setInterval(
      drawStars.bind(this),
      this.props.interval,
    )

    function drawStars ()
    {
      context.clearRect(0, 0, width, height)
      context.fillRect(0, 0, width, height)

      let drawNow

      for (let i = 0; i < stars.length; i++) {
        let star = stars[i]
        let currentX = star.stepX
        let currentY = star.stepY

        drawNow = true
        star.z -= this.props.speed

        if (star.z > z) {
          star.z -= z
          drawNow = false
        }

        if (star.z < 0) {
          star.z += z
          drawNow = false
        }

        star.stepX = x + (star.x / star.z) * this.props.starRatio
        star.stepY = y + (star.y / star.z) * this.props.starRatio

        if (currentX > 0 && currentX < width &&
          currentY > 0 && currentY < height &&
          drawNow) {
          context.beginPath()
          context.lineWidth = (1 - starLineWidthRatio * star.z) * this.props.starSize
          context.moveTo(currentX, currentY)
          context.lineTo(star.stepX, star.stepY)
          context.stroke()
        }
      }

      context.closePath()
    }
  }

}
