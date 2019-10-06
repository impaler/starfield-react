# Starfield

A retro Star Field Space effect in a html canvas element through a React component and or hook.

![](https://github.com/impaler/starfield-react/blob/develop/example/images/defaults.gif?raw=true)

See a live editable demo here:

[![Edit starfield-react example](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/musing-lamarr-84is6?fontsize=14)

Install from npm:

    `npm install starfield-react`
    `yarn add starfield-react`

2) Add it to your React app:

```js
import { StarField } from 'starfield-react'
import { render } from 'react-dom'

render(<StarField/>, document.querySelector('body'))
```

Documentation on the StarField Component props are on the Props `interface` type in [`src/StarField.tsx`](https://github.com/impaler/starfield-react/blob/develop/src/StarField.tsx#L6). 

See the [codesandbox](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/musing-lamarr-84is6?fontsize=14) for a fully working demo.

Examples of different props in action:

![](https://github.com/impaler/starfield-react/blob/develop/example/images/colors.gif?raw=true)
![](https://github.com/impaler/starfield-react/blob/develop/example/images/colors-square.gif?raw=true)
![](https://github.com/impaler/starfield-react/blob/develop/example/images/green-warp.gif?raw=true)
![](https://github.com/impaler/starfield-react/blob/develop/example/images/high-count.gif?raw=true)
