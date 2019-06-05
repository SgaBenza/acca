import { h, render, setState } from './lib/acca'
import './style.css'

const state = { text: '', isFocused: false }

function view(actualState) {
  let node = h('div', {}, [
    h('input', {
      props: {
        type: 'text',
        placeholder: 'Type your name',
        autocomplete: 'off',
        value: actualState.text,
      },
      on: {
        input: event => {
          setState(view, state, { text: event.target.value })
        },
      },
    }),
    h('div', {}, [state.text]),
  ])

  return node
}

render(view, state)
