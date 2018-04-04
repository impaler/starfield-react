import * as React from 'react'
import * as ReactDOM from 'react-dom'
import debounce from 'lodash.debounce'

export interface ExpanderProps
{
  width?: number
  height?: number
  debounce?: number
  expandTarget?: ExpandTarget
}

export enum ExpandTarget
{
  window = 'window',
  parent = 'parent',
}

export interface ExpanderState
{
  width: number
  height: number
}

export const Expander: any =
  (Wrapped) => class extends React.Component<ExpanderProps, ExpanderState>
  {
    private setPositionDebounced: EventListener
    private nodeElement: Element

    static defaultProps = {
      width: undefined,
      height: undefined,
      debounce: 200,
      expandTarget: ExpandTarget.window,
    }

    componentDidMount ()
    {
      this.setPosition.apply(this)

      this.setPositionDebounced = debounce(
        this.setPosition.bind(this)
        , this.props.debounce,
      )

      window.addEventListener('resize', this.setPositionDebounced.bind(this))
    }

    componentWillUnmount ()
    {
      window.removeEventListener('resize', this.setPositionDebounced)
    }

    render ()
    {
      if (this.state && this.state.width && this.state.height) {

        let width = this.state && this.state.width || undefined
        let height = this.state && this.state.height || undefined
        let newProps = { ...this.props, width, height }

        return (
          <Wrapped
            ref={node => this.nodeElement = node}
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

    resolveExpandTarget (canvasElement)
    {
      const height = this.props.height ||
      (this.props.expandTarget === ExpandTarget.window) ?
        window.outerHeight :
        canvasElement.parentElement.clientHeight

      const width = this.props.width ||
      (this.props.expandTarget === ExpandTarget.window) ?
        window.outerWidth :
        canvasElement.parentElement.clientWidth

      return { width, height }
    }

    setPosition ()
    {
      const canvasElement = ReactDOM.findDOMNode(this)
      if (canvasElement) {
        const dimensions = this.resolveExpandTarget.apply(this, canvasElement)
        this.setState(dimensions)
      }

    }
  }
