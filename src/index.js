import { render, h } from './lib/acca'
import { Router, parseRequestURL } from './lib/router'
import { routes } from './routes'
import { navButtons } from './components/navButtons'
import './style.css'

const textInputState = { textUno: 'text', textDue: 't2t' }
const routerState = { pathname: parseRequestURL() }

const view = () =>
  h('div', {}, [
    navButtons(),
    Router({ routes, pathname: routerState.pathname, state: textInputState }),
  ])

function handlePathname(pathname) {
  routerState.pathname = pathname || parseRequestURL()
}

render(view)

// listeners URL changes and pages loaded
window.addEventListener('popstate', () => {
  console.log(location.pathname)
  // handlePathnameChange(location.pathname)
})

// const view = () => routes(textInputState)['/']

/* function handlePathnameChange(pathname) {
  routerState.pathname = pathname
} */
