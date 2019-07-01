import { render, h } from './lib/acca'
import { textInputView } from './components/pages/text-input'
import './style.css'

const textInputState = { textUno: 'text', textDue: 't2t' }

const view = () => h('div', {}, [textInputView(textInputState)])

render(view)
