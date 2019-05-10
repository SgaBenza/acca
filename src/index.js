import { h, render, setState } from './lib/acca'
import './style.css'

const state = { text: '', isFocused: false }

function view(actualState) {
  let node = h('div#view', {}, [
    h('div', { props: { style: 'display: flex;' } }, [
      h('input#input.input', {
        props: {
          type: 'text',
          placeholder: 'Type a your name',
          value: actualState.text,
          autocomplete: 'off',
        },
        on: {
          input: event => {
            setState(view, state, { text: event.target.value })
          },
          focus: () => setState(view, state, { isFocused: true }),
          // blur: () => setState(view, state, { isFocused: false }),
        },
        focused: actualState.isFocused,
      }),
      h(
        'button',
        {
          props: { style: 'margin-left: 8px;' },
          on: { click: () => setState(view, state, { text: '' }) },
        },
        ['RESET']
      ),
    ]),
    h('hr'),
    h('div#patch', {}, [`Hello ${actualState.text}`]),
    h('hr'),
    h('pre', {}, [JSON.stringify(state)]),
  ])

  return node
}

render(view, state)
