import { h, render, setState } from './lib/acca'
import './style.css'

const state = { text: '', isFocused: false }

function view(actualState) {
  let node = h('div#primo', {}, [
    h('div', { props: { style: 'color:red' } }, ['ROSSO', h('div', {}, ['Innesto'])]),
    'child',
    h('div.class', {}, ['terzo elemento']),
  ])

  return node
}

render(view, state)
