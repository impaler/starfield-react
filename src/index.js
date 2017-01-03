import Expander from './components/Expander'
import Starfield from './components/Starfield'

let ExpandingStarfield = Expander(Starfield)

function randomColor() {
    let letters = '0123456789ABCDEF'
    let color = new Array(6)
        .fill(null)
        .map(() => letters[Math.floor(Math.random() * 16)])
        .join('')

    return `#${color}`
}


export default Starfield

export {
    Expander,
    Starfield,
    ExpandingStarfield,
    randomColor,
}