import expect from 'expect'
import React from 'react'
import {render, unmountComponentAtNode} from 'react-dom'

import {Starfield, Expander} from '../src'

describe('Component', () => {
    let node

    beforeEach(() => {
        node = document.createElement('div')
        node.setAttribute('style', 'width: 1300px')
        document.body.appendChild(node)
    })

    afterEach(() => {
        unmountComponentAtNode(node)
    })

    it('contains a canvas element and className', () => {
        const customClassName = 'supercalifragilistic-expialidocious'

        render(
            <Starfield
                className={customClassName}
                count={1000}
                speed={3}
                starSize={.8}
            />, node, () => {
                var canvas = node.querySelector('canvas')
                expect(canvas.nodeName).toEqual('CANVAS')

                var canvasClassName = node.querySelector(`canvas.${customClassName}`)
                expect(canvasClassName.nodeName).toEqual('CANVAS')
            })
    })

    it('has the correct dimensions from props', () => {
        render(
            <Starfield
                height={360}
                width={460}
            />, node, () => {
                var canvas = node.querySelector('canvas')
                expect(canvas.nodeName).toEqual('CANVAS')
                expect(canvas.getAttribute('height')).toEqual(360)
                expect(canvas.getAttribute('width')).toEqual(460)

            })
    })

    it('composes Starfield with Expander that then inherits the parent element\'s width', () => {
        var ExpandingStar = Expander(Starfield)

        render(
            <ExpandingStar />, node, () => {
                var canvas = node.querySelector('canvas')
                expect(canvas.parentElement.clientWidth).toEqual(1300)
            })
    })

    it('The Expander component sets a custom class name on it\'s Wrapper component in the dom', () => {
        var ExpandingStar = Expander(Starfield)

        const customClassName = 'supercalifragilistic-expialidocious'

        render(
            <ExpandingStar
                className={customClassName}
            />, node, () => {
                var canvasClassName = node.querySelector(`canvas.${customClassName}`)
                expect(canvasClassName.nodeName).toEqual('CANVAS')
            })
    })

})
