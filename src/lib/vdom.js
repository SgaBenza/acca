export function removeChildren(node) {
  while (node.hasChildNodes()) {
    node.removeChild(node.firstElementChild)
  }
}

// QUEUE PATTER
let queue = {}
export let DOM = []

export function setQueue(queueObj) {
  const keys = Object.keys(queueObj)
  keys.forEach(k => Object.assign(queue, queueObj))
}

export function pushElementDOM(element) {
  DOM.push({ tree: element, queue })

  queue = {}
}

export function reset() {
  queue = {}
  DOM = []
}

export function getDOM() {
  DOM.forEach(elm => {
    const { id, classes, attributes } = elm.queue
    const { tree } = elm

    if (id) tree.setAttribute('id', id)
    if (classes) tree.setAttribute('class', classes)
    if (attributes) tree.setAttribute(attributes[0], attributes[1])
  })

  return DOM[DOM.length - 1].tree
}
