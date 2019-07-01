import { h } from '../lib/acca'

export const prevNext = h('div', {}, [
  'SPA',
  h(
    'button',
    { props: { style: { margin: '8px;' } }, on: { click: () => window.history.back() } },
    ['back']
  ),
  h(
    'button',
    { props: { style: { margin: '8px;' } }, on: { click: () => window.history.forward() } },
    ['forward']
  ),
])
