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
    const { id, classes } = elm

    if (id) elm.tree.setAttribute('id', id)
    if (classes) elm.tree.setAttribute('class', classes)
  })

  return DOM[DOM.length - 1].tree
}
