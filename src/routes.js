import { h } from './lib/acca'
import { textInputView } from './components/pages/text-input'
import { navigationView } from './components/pages/navigation'

export const routes = {
  '/': h('div', {}, [textInputView]),
  '/input': h('div', {}, [textInputView]),
}
