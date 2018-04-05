import * as React from 'react'
import { render } from 'react-dom'
import DatGui, { DatSelect, DatBoolean, DatColor, DatNumber, DatString } from 'react-dat-gui'

import { StarField } from '../src'
import { randomColor as randomColorGen } from './lib/color'

import './index.css'
import 'react-dat-gui/dist/index.css'
import { useState } from 'react'

const data = {
  count: 3000,
  speed: 3,
  starRatio: 356,
  starSize: 1.4,
  starStyle: '#fff',
  starShape: 'round',
  clear: true,
  bgStyle: '#000',
  noBackground: false,
  randomColor: true,
}

const Demo = () => {
  const [state, setState] = useState<any>(data)
  const { randomColor, ...componentProps } = state

  return (
    <div className="demo-container">

      <DatGui data={state} onUpdate={setState}>
        <DatNumber path='speed' label='Speed' min={0} max={300} step={0.1} value={state.speed} />
        <DatNumber path='starRatio' label='starRatio' min={0} max={360} step={1} value={state.starRatio} />
        <DatNumber path='count' label='count' min={0} max={100000} step={1} value={state.count} />
        <DatNumber path='starSize' label='starSize' min={0} max={150} step={1} value={state.starSize} />
        <DatBoolean path={'randomColor'} value={state.randomColor} />
        {!state.randomColor && (
          <DatColor path={'starStyle'} value={state.starStyle} />
        )}
        <DatColor path={'bgStyle'} value={state.bgStyle} />
        <DatBoolean path={'noBackground'} value={state.noBackground} />
        <DatBoolean path={'clear'} value={state.clear} />
        <DatSelect path='starShape' options={['butt', 'round', 'square']} />
        <DatNumber path='fps' label='FPS' min={0} max={120} step={1} value={state.fps} />
      </DatGui>

      <StarField
        width={1200}
        height={800}
        {...componentProps}
        {...state.randomColor && { starStyle: randomColorGen }}
      />

      <br />
      <br />
      <br />

      <Box>
        <StarField />
        <StarField count={62700} />
        <StarField noBackground />
        <StarField starStyle={randomColorGen} />
      </Box>

      <Box>
        <StarField width={600} />
        <StarField width={600} fps={10} />
        <StarField width={600} speed={0.3} />
      </Box>

      <Box>
        <StarField starSize={10} speed={0.2} />
        <StarField starSize={10} fps={4} />
        <StarField starSize={10} speed={60} starStyle={'#00ff09'} />
        <StarField starSize={10} speed={60} fps={10} starStyle={'#00ff09'} />
      </Box>

      <Box>
        <StarField starRatio={1} />
        <StarField starRatio={1} starStyle={randomColorGen} />
        <StarField starRatio={1} starSize={3} starStyle={randomColorGen} clear={false} />
      </Box>

    </div>
  )
}

const Box = ({ children }) =>
  <div style={{ display: 'flex', justifyContent: 'center' }}>
    {children}
  </div>

render(<Demo />, document.querySelector('#app'))

