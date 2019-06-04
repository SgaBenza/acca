import { h, render, setState } from './lib/acca'
import './style.css'

const state = { text: '', isFocused: false }

function view(actualState) {
  let node = h('div.lsdkfj#iu', { props: { style: 'ofjso', ley: 'key' } }, [
    /* h('input', {
      props: {
        type: 'text',
        placeholder: 'Type a your name',
        autocomplete: 'off',
      },
      on: {
        input: event => {
          event.target.value = state.text + event.target.value
          setState(view, state, { text: event.target.value })
        },
      },
    }), */
    'XXXX',
  ])

  return node
}

render(view, state)
