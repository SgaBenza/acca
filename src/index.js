import { h, render, setState } from './lib/acca'
import './style.css'

const state = { text: '', isFocused: false }

function view(actualState) {
  let node = h('div#primo', {}, [
    h('button', { on: { click: () => console.log('FUCK YEAH !!!!!!') } }, ['B T O O N']),
  ])

  return node
}

render(view, state)
