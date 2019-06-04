export function removeChildren(node) {
  while (node.hasChildNodes()) {
    node.removeChild(node.firstElementChild)
  }
}

// QUEUE PATTER
let queue = {}
let queueArr = []
export let DOM = []

export function setQueue(queueObj) {
  /* if (queueObj.length > 1) {
    queueObj.forEach((k, i) => {
      console.log('k', k)
      Object.assign(queue, k)
    })
  } else { */
  Object.assign(queue, queueObj)
}

export function setQueueProps(queueObjArr) {
  queueObjArr.forEach(obj => {
    queueArr.push(obj)
  })
}

export function pushElementDOM(element) {
  DOM.push({ tree: element, queue, queueArr })

  queue = {}
}

export function reset() {
  queue = {}
  DOM = []
}

export function getDOM() {
  DOM.forEach(elm => {
    const { id, classes, listeners } = elm.queue
    const attributes = elm.queueArr
    const { tree } = elm

    if (id) tree.setAttribute('id', id)
    if (classes) tree.setAttribute('class', classes)
    if (attributes) {
      attributes.forEach(attr => {
        tree.setAttribute(attr.attributes[0], attr.attributes[1])
      })
    }

    // EVENT LISTENERS
    if (listeners) tree.addEventListener(listeners[0], listeners[1])
  })

  return DOM[DOM.length - 1].tree
}
