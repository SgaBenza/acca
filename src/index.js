import { h } from './lib/acca'
import { removeChildren } from './lib/vdom'

const root = document.getElementById('root')

const update = event => {
  const state = { text: event.target.value, isFocused: true }

  removeChildren(root)
  render(state)

  const input = document.getElementById('input')
  const pos = input.value.length

  // keep focused and set caret position at the end
  input.focus()
  input.setSelectionRange(pos, pos)
}

function view(state) {
  let node = h('div#view', {}, [
    h('input#input', {
      props: {
        type: 'text',
        placeholder: 'Type a your name',
        value: state.text,
      },
      on: { input: update },
    }),
    h('hr'),
    h('div#patch', {}, [`Hello ${state.text}`]),
  ])

  return node
}

function render(state) {
  root.appendChild(view(state))
}

render({ text: '', isFocused: false })
