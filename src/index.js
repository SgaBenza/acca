import { h } from './lib/acca'
import { removeChildren } from './lib/vdom'

const root = document.getElementById('root')
const state = { text: '', isFocused: false }

const setState = actualState => {
  state.text = actualState.text
  state.isFocused = actualState.isFocused

  render(state)
}

function setInputFocus() {
  // keep focused and set caret position at the end
  const input = document.getElementById('input')
  const pos = input.value.length

  if (state.isFocused) {
    input.focus()
    input.setSelectionRange(pos, pos)
  }
}

function view(actualState) {
  let node = h('div#view', {}, [
    h('input#input', {
      props: {
        type: 'text',
        placeholder: 'Type a your name',
        value: actualState.text,
        autocomplete: 'off',
      },
      on: { input: event => setState({ text: event.target.value, isFocused: true }) },
    }),
    h('hr'),
    h('div#patch', {}, [`Hello ${actualState.text}`]),
  ])

  return node
}

function render(actualState) {
  removeChildren(root)
  root.appendChild(view(actualState))

  const { isFocused } = actualState

  if (isFocused) {
    setInputFocus()
  }
}

render(state)
