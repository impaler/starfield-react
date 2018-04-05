# Starfield

A retro Star Field Space effect in a html canvas element through a React component and or hook.

See a live editable demo here:

![starRatio={1}](https://github.com/impaler/starfield-react/blob/develop/example/images/defaults.gif?raw=true)
![starRatio={1}](https://github.com/impaler/starfield-react/blob/develop/example/images/colors.gif?raw=true)
![starRatio={1}](https://github.com/impaler/starfield-react/blob/develop/example/images/colors-square.gif?raw=true)
![starRatio={1}](https://github.com/impaler/starfield-react/blob/develop/example/images/green-warp.gif?raw=true)
![starRatio={1}](https://github.com/impaler/starfield-react/blob/develop/example/images/high-count.gif?raw=true)

[![Edit starfield-react example](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/musing-lamarr-84is6?fontsize=14)

Getting Started:

    - `npm install starfield-react`
    - `yarn add starfield-react`

2) Add it to your React app:

```js
import { render } from 'react-dom'
import { StarField } from 'starfield-react'

render(<StarField/>, document.querySelector('body'))
```

For documentation on the available StarField Component props, see the Props `interface` type in `src/StarField.tsx`. 
