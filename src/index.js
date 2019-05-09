import { h, render, setState } from './lib/acca'

const state = { text: '', isFocused: false }

function view(actualState) {
  let node = h('div#view', {}, [
    h('div', { props: { style: 'display: flex;' } }, [
      h('input#input', {
        props: {
          type: 'text',
          placeholder: 'Type a your name',
          value: actualState.text,
          autocomplete: 'off',
        },
        on: {
          input: event => setState(view, state, { ...state, text: event.target.value }),
          focus: () => setState(view, state, { ...state, isFocused: true }),
          blur: event => setState(view, state, { ...state, isFocused: false }),
        },
        focused: state.isFocused,
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
