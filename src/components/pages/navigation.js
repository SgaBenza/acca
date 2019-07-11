import { h } from '../../lib/acca'
import { Router } from '../../lib/router'
import { routes } from '../../routes'
import { navButtons } from '../navButtons'
import { prevNext } from '../prevNext'

// const state = { pathname: '/first' }

export const navigationView = (state, handlePathname) => {
  let node = h('div#view', {}, [h('div', {}, [prevNext]), navButtons({ handlePathname })])

  return node
}
