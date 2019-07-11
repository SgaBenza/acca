import { h } from '../acca'

export const parseRequestURL = () => {
  return location.pathname.toLowerCase() || '/'
}

export function setHistory(pathName) {
  history.pushState({ page: `${pathName}` }, `${pathName}`, `${pathName}`)
}

export function getActualPathname() {
  return location.pathname.toLowerCase() || '/'
}

export const Router = ({ routes, pathname, state }) => {
  return h('div', {}, [routes(state)[pathname]])
}
