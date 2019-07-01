import { h } from '../lib/acca'
import { router } from '../lib/router'

const buttonStyle = { style: { margin: '8px;' } }

export const navButtons = ({ handlePathname }) => {
  function handleChange(pathName) {
    // handlePathname(router.onButtonClick(pathName))
  }

  return h('div', {}, [
    h('button', { props: buttonStyle, on: { click: () => handleChange('') } }, ['FIRST']),
    /*  h('button', { props: buttonStyle, on: { click: () => handleChange('') } }, ['HOME']),
    h('button', { props: buttonStyle, on: { click: () => handleChange('first') } }, ['FIRST']),
    h('button', { props: buttonStyle, on: { click: () => handleChange('second') } }, ['SECOND']),
    h('button', { props: buttonStyle, on: { click: () => handleChange('third') } }, ['THIRD']), */
  ])
}
