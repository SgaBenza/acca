import { render } from './lib/acca'
import { textInputView } from './components/pages/text-input'
import './style.css'

const textInputState = { textUno: 'text', textDue: 't2t' }

render(textInputView, textInputState)
