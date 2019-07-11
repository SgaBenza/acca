import { h } from '../acca'

export const router = {
  onButtonClick: pathName => {
    // window.location.href = `${window.location.origin}#/${pathName}`
    history.pushState({ id: `${pathName}` }, `${pathName}`, `${pathName}`)
  },
}

export const parseRequestURL = () => {
  return location.pathname.toLowerCase() || '/'
}

export const Router = ({ routes, pathname, state }) => {
  return h('div', {}, [routes(state)[pathname]])
}
