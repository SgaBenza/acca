import { h } from '../lib/acca'
import { getActualPathname, setHistory } from '../lib/router'

const buttonStyle = { style: { margin: '8px;' } }

export const navButtons = setRouterState => {
  function handleChange(pathName) {
    setHistory(pathName)
    setRouterState(getActualPathname())
  }

  return h('div', {}, [
    h('button', { props: buttonStyle, on: { click: () => handleChange('/') } }, ['HOME']),
    h('button', { props: buttonStyle, on: { click: () => handleChange('input') } }, ['INPUT']),
  ])
}
