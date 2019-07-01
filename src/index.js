import { h, render, setState } from './lib/acca'
import './style.css'

const state = { textUno: 'text', textDue: 't2t' }

function view(actualState) {
  let node = h('div', {}, [
    h('input#uno', {
      props: {
        type: 'text',
        placeholder: 'Type your name',
        autocomplete: 'off',
        value: actualState.textUno,
      },
      on: {
        input: event => {
          setState(view, state, { textUno: event.target.value }, event)
        },
      },
    }),
    h(
      'textarea#due',
      {
        props: {
          type: 'text',
          placeholder: 'ALTER',
          autocomplete: 'off',
          value: actualState.textDue,
        },
        on: {
          input: event => {
            setState(view, state, { textDue: event.target.value }, event)
          },
        },
      },
      [state.textDue]
    ),
    h('div', {}, [state.textUno]),
    h('div', {}, [state.textDue]),
  ])

  return node
}

render(view, state)
