import { h } from './lib/acca'
import { removeChildren } from './lib/vdom'

const root = document.getElementById('root')
const state = { text: '', isFocused: false }

const update = event => {
  state.text = event.target.value
  state.isFocused = true

  removeChildren(root)
  render(state)

  // keep focused and set caret position at the end
  const input = document.getElementById('input')
  const pos = input.value.length

  state.isFocused && input.focus()
  input.setSelectionRange(pos, pos)
}

function view(actualState) {
  let node = h('div#view', {}, [
    h('input#input', {
      props: {
        type: 'text',
        placeholder: 'Type a your name',
        value: actualState.text,
      },
      on: { input: update },
    }),
    h('hr'),
    h('div#patch', {}, [`Hello ${actualState.text}`]),
  ])

  return node
}

function render(actualState) {
  root.appendChild(view(actualState))
}

render({ text: '', isFocused: false })
