# Starfield

A react component that draws a starfield in a canvas element.

Using the starfield is just like a regular React component from npm:

1) `npm install starfield-react --save`

2) Add it to your React app:

```
import {render} from 'react-dom'
import {Starfield} from 'starfield-react'

render(<Starfield/>, document.querySelector('body'))
```

The default Starfield will look like:

![Default starfield render](https://github.com/impaler/starfield-react/blob/develop/demo/thumbnails/default-field.gif?raw=true)

See the demo app for more examples in `demo/src/index.js`.

The component has configurable through standard `propTypes` documented below, they let you achieve effects like this:

![starRatio={1}](https://github.com/impaler/starfield-react/blob/develop/demo/thumbnails/starRatio={1}.gif?raw=true)
 
![starSize={10}](https://github.com/impaler/starfield-react/blob/develop/demo/thumbnails/starSize={10}.gif?raw=true)
 
![speed={13}starStyle={randomColor}](https://github.com/impaler/starfield-react/blob/develop/demo/thumbnails/speed={13}starStyle={randomColor}.gif?raw=true)

![Exapander component](https://github.com/impaler/starfield-react/blob/develop/demo/thumbnails/Expander.gif?raw=true)


## React propTypes


The total number of stars to draw in the starfield.

    count: React.PropTypes.number

The speed at which the stars travel, resulting in longer lines as pseudo motion blur.

    speed: React.PropTypes.number

The interval rate at which the canvas draws 
    
    interval: React.PropTypes.number
 

The size of the stars to draw
    
    starSize: React.PropTypes.number
 

The width of the canvas element
    
    width: React.PropTypes.number
 
The height of the canvas element
    
    height: React.PropTypes.number
 
The css style given to the stars in the canvas strokeStyle api, eg: `rgb(0,255,0)` 
    
    starStyle: React.PropTypes.string
 
The background canvas fillStyle, eg: `rgb(0,0,0)`
    
    bgStyle: React.PropTypes.string
 