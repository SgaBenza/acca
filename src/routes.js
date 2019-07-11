import { h } from './lib/acca'
import { textInputView } from './components/pages/text-input'

export const routes = state => {
  return {
    '/': h('div', {}, ['H O M E']),
    '/input': h('div', {}, [textInputView(state)]),
  }
}
