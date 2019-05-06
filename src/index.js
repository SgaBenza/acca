import { h } from './lib/acca'
import { state } from './lib/state'
import { removeChildren } from './lib/vdom'

const root = document.getElementById('root')

const update = event => {
  state.text += event.target.value
  state.isFocused = true
  removeChildren(root)
  render()
}

function view(name) {
  let node = h('div#view', {}, [
    h('input', {
      props: {
        type: 'text',
        placeholder: 'Type a your name',
        autofocus: state.isFocused,
        value: state.text,
      },
      on: { input: update },
    }),
    h('hr'),
    h('div#patch', {}, [`Hello ${name}`]),
  ])

  return node
}

function render() {
  root.appendChild(view(state.text))
}

render()
