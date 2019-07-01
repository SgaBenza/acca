import { h } from './lib/acca'
import { textInputView } from './components/pages/text-input'
import { navigationView } from './components/pages/navigation'

console.log(textInputView)
export const routes = {
  '/input': h('div', {}, [textInputView]),
}
