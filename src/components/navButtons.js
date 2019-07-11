import { h } from '../lib/acca'
import { router } from '../lib/router'

const buttonStyle = { style: { margin: '8px;' } }

export const navButtons = () => {
  function handleChange(pathName) {
    // handlePathname(router.onButtonClick(pathName))
  }

  return h('div', {}, [
    h('button', { props: buttonStyle, on: { click: () => handleChange('') } }, ['HOME']),
    h('button', { props: buttonStyle, on: { click: () => handleChange('') } }, ['INPUT']),
  ])
}
