export function removeChildren(node) {
  while (node.hasChildNodes()) {
    node.removeChild(node.firstElementChild)
  }
}

// QUEUE PATTER
let queue = {}
let queueArr = []
let DOM = []

// FOCUS
const focus = { isFocused: false }

export function setQueue(queueObj) {
  Object.assign(queue, queueObj)
}

export function setQueueMultiple(queueObjArr) {
  queueObjArr.forEach(obj => {
    queueArr.push(obj)
  })
}

export function pushElementDOM(element) {
  DOM.push({ tree: element, queue, queueArr })

  // Modify and Clean array
  reset()
}

function reset() {
  queue = {}
  queueArr = []
}

export function getDOM(state) {
  let focusedElement

  DOM.forEach(elm => {
    const { id, classes, listeners } = elm.queue
    const properties = elm.queueArr
    const { tree } = elm

    if (id) tree.setAttribute('id', id)
    if (classes) tree.setAttribute('class', classes)
    if (properties) {
      properties.forEach(attr => {
        const [name, value] = attr.attributes
        tree.setAttribute(name, value)
      })
    }

    // EVENT LISTENERS
    if (listeners) {
      const [event, action] = listeners

      tree.addEventListener(event, action)
    }

    if (state.isFocused && focusedElement === undefined) {
      focusedElement = document.getElementById('focus')
      console.log(tree)
    }
  })

  return { tree: DOM[DOM.length - 1].tree, focusedElement: focusedElement }
}
