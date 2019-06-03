import { h, render, setState } from './lib/acca'
import './style.css'

const state = { text: '', isFocused: false }

function view(actualState) {
  let node = h('div#view', {}, [h('div#patch', {}, [`Hello ${actualState.text}`]), h('hr')])

  return node
}

render(view, state)
