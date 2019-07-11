import { render, h } from './lib/acca'
import { Router } from './lib/router'
import { routes } from './routes'
import { navigation } from './components/pages/navigation'
import { textInputView } from './components/pages/text-input'
import './style.css'

const textInputState = { textUno: 'text', textDue: 't2t' }
// const routerState = { pathname: parseRequestURL() }
const routerState = { pathname: '/' }

const view = () =>
  h('div', {}, [Router({ routes, pathname: routerState.pathname, state: textInputState })])

render(view)

// const view = () => routes(textInputState)['/']

/* function handlePathname(pathname) {
  routerState.pathname = pathname || parseRequestURL()

  render(view)
} */

/* function handlePathnameChange(pathname) {
  routerState.pathname = pathname
} */

// listeners URL changes and pages loaded
/* window.addEventListener('popstate', () => {
  handlePathnameChange(location.pathname)
}) */
