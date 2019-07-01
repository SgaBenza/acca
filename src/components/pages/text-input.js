import { h, setState } from '../../lib/acca'
import 'style.css'

export function textInputView(actualState) {
  let node = h('div', {}, [
    h('input#uno.focusedInput', {
      props: {
        type: 'text',
        placeholder: 'Type your name',
        autocomplete: 'off',
        value: actualState.textUno,
      },
      on: {
        input: event => {
          setState(textInputView, actualState, { textUno: event.target.value }, event)
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
            setState(textInputView, actualState, { textDue: event.target.value }, event)
          },
        },
      },
      [actualState.textDue]
    ),
    h('div', {}, [actualState.textUno]),
    h('div', {}, [actualState.textDue]),
  ])

  return node
}
