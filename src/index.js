import { h } from './lib/acca'

let root = document.getElementById('root')

const update = event => {
  const { helloNode } = view(event.target.value)
  const viewNode = root.childNodes[0]

  viewNode.removeChild(viewNode.childNodes[2])
  viewNode.appendChild(helloNode)
}

function view(name) {
  let helloNode = h('div#patch', {}, [`Hello ${name}`])
  let node
  node = h('div#view', {}, [
    h('input', {
      props: { type: 'text', placeholder: 'Type a your name' },
      on: { input: update },
    }),
    h('hr'),
    helloNode,
  ])
  return { node, helloNode }
}

root.appendChild(view('').node)
