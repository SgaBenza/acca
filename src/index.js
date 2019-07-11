import { render, h } from './lib/acca'
import { Router, parseRequestURL } from './lib/router'
import { routes } from './routes'
import { navButtons } from './components/navButtons'
import { prevNext } from './components/prevNext'
import './style.css'

const textInputState = { textUno: 'text', textDue: 't2t' }
const routerState = { pathname: parseRequestURL() }

const view = () =>
  h('div', {}, [
    navButtons(setRouterState),
    Router({ routes, pathname: routerState.pathname, state: textInputState }),
    prevNext,
  ])

function setRouterState(pathname) {
  routerState.pathname = pathname || parseRequestURL()
  render(view)
}

render(view)

// listeners URL changes and pages loaded
window.addEventListener('popstate', () => {
  setRouterState(location.pathname)
})
