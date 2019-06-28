import { h, render, setState } from './lib/acca'
import './style.css'

const state = { text: 'text', isFocused: false }

function view(actualState) {
  let node = h('div', {}, [
    h('input#focus', {
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
        /*  focus: () => {
          setState(view, state, { isFocused: true })
        }, */
        /* blur: () => {
          setState(view, state, { isFocused: false })
        }, */
      },
    }),
    h('div', {}, [state.text]),
  ])

  return node
}

render(view, state)
