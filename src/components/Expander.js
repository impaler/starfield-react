import React from 'react'
import ReactDOM from 'react-dom'
import debounce from 'lodash.debounce'

let Expander = Wrapped => class extends React.Component {

    static propTypes = {
        width: React.PropTypes.number,
        height: React.PropTypes.number,
        debounce: React.PropTypes.number,
    }

    static defaultProps = {
        width: undefined,
        height: 300,
        debounce: 200
    }

    componentDidMount() {
        this.setPosition.apply(this)

        this.myEfficientFn = debounce(
            this.setPosition.bind(this)
            , this.props.debounce)

        window.addEventListener('resize', this.myEfficientFn.bind(this))
    }

    setPosition() {
        let canvasElement = ReactDOM.findDOMNode(this)
        if (canvasElement) {
            let width = this.props.width || canvasElement.parentElement.clientWidth
            let height = this.props.height || canvasElement.parentElement.clientHeight

            this.setState({
                width,
                height,
            })
        }

    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.myEfficientFn)
    }

    render() {

        if (this.state && this.state.width && this.state.height) {

            let width = this.state && this.state.width || undefined
            let height = this.state && this.state.height || undefined
            let newProps = {...this.props, width, height}

            return (
                <Wrapped ref={node => this.nodeElement = node}
                         {...this.props}
                         {...newProps}
                >
                    {this.props.children}
                </Wrapped>
            )
        } else {

            // wait for the dom, ugly?
            return <div ref={node => this.nodeElement = node}/>
        }

    }
}

export default Expander