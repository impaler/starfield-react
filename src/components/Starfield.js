import React from 'react'
import ReactDOM from 'react-dom'

export default
class StarFieldCore extends React.Component {

    constructor(props) {
        super(props)
        this.state = StarFieldCore.createState(props)
    }

    static propTypes = {
        count: React.PropTypes.number,
        speed: React.PropTypes.number,
        starRatio: React.PropTypes.number,
        starSize: React.PropTypes.number,
        width: React.PropTypes.number,
        height: React.PropTypes.number,
        interval: React.PropTypes.number,
        starStyle: React.PropTypes.string,
        bgStyle: React.PropTypes.string,
    }

    static defaultProps = {
        count: 3000,
        speed: 3,
        starRatio: 256,
        starSize: 1.4,
        width: 300,
        height: 300,
        interval: 100,
        bgStyle: 'rgb(0,0,0)',
        starStyle: 'rgb(255,255,255)',
    }

    static createState(nextProps) {
        let width = nextProps.width
        let height = nextProps.height

        let x = Math.round(width / 2)
        let y = Math.round(height / 2)
        let z = (width + height) / 2

        return {
            stars: StarFieldCore.createStars(x, y, z, width, height, nextProps.count),
            width,
            height,
            x,
            y,
            z,
        }
    }

    static createStars(x, y, z, width, height, count) {
        let starPool = []
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

    componentDidUpdate() {
        clearInterval(this.requestID)
        this.renderStars()
    }

    componentWillReceiveProps(nextProps) {
        this.setState(StarFieldCore.createState(nextProps))
    }

    componentWillUnmount() {
        clearInterval(this.requestID)
    }

    render() {
        return (
            <canvas
                className={this.props.className}
                ref="canvas"
                width={this.state.width}
                height={this.state.height}
            />
        )
    }

    componentDidMount() {
        this.renderStars()
    }

    renderStars() {
        let {width, height, x, y, z, stars} = this.state
        let canvasElement = ReactDOM.findDOMNode(this.refs.canvas)
        let context = canvasElement.getContext('2d')
        let starLineWidthRatio = 1 / z

        canvasElement.width = width
        canvasElement.height = height
        context.fillStyle = this.props.bgStyle
        context.strokeStyle = this.props.starStyle
        context.lineCap = 'round'

        this.requestID = setInterval(drawStars.bind(this), this.props.interval)

        function drawStars() {
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