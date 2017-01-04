import React from 'react'
import {render} from 'react-dom'

import {Starfield, ExpandingStarfield, randomColor} from '../../src'
require('./index.css')

let Demo = React.createClass({

    render() {
        return (
            <div className="demo-container">
                <ExpandingStarfield
                    count={2000}
                    speed={3}
                    height={360}
                    starSize={.8}
                />

                <Starfield
                />

                <Starfield
                    starStyle={randomColor()}
                    speed={13}
                />

                <Starfield
                    interval={10}
                />

                <Starfield
                    starSize={10}
                />

                <Starfield
                    starRatio={1}
                />


            </div>
        )
    }

})

render(<Demo/>, document.querySelector('#demo'))
