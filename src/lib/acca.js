import { removeChildren } from './vdom'

function objectToStyleDeclaration(objectValue) {
  return JSON.stringify(objectValue)
    .replace(/\}|,/g, '; ')
    .replace(/\{|"/g, '')
    .replace(/:/g, ': ')
    .trim()
}

function isString(value) {
  return typeof value === 'string'
}

// Queue Pattern
let queue = {}
let DOM = []
let QUEUE_ARR = []

export function setQueue(queueObj) {
  const keys = Object.keys(queueObj)
  keys.forEach(k => Object.assign(queue, queueObj))
}

export function h(tagName, attributes = {}, children = []) {
  const tagNameSet = tagName.split(/(#\w+)|(\.\w+)/g)
  const element = document.createElement(tagNameSet[0] || 'div')

  tagNameSet.splice(0, 1)
  let id
  let classes = ''

  tagNameSet.forEach(d => {
    if (d) {
      switch (d.charAt(0)) {
        case '.':
          classes = `${classes} ${d.replace(d.charAt(0), '')}`
          break
        case '#':
          id = d.replace(d.charAt(0), '')
          break
      }
    }
  })

  if (id) {
    // element.setAttribute('id', id)
    setQueue({ id: id })
  }
  if (classes) {
    // element.setAttribute('class', classes.trim())
    setQueue({ classes: classes.trim() })
  }

  if (attributes.props) {
    Object.entries(attributes.props).forEach(([key, value]) => {
      const attributeValue = isString(value) ? value : objectToStyleDeclaration(value)

      element.setAttribute(
        key,
        JSON.stringify(attributeValue)
          .replace(/\}|,/g, ';')
          .replace(/\{|"/g, '')
      )
    })
  }

  if (attributes.on) {
    Object.entries(attributes.on).forEach(([event, action]) => {
      element.addEventListener(event, action)
    })
  }

  if (attributes.focused) {
    classes.replace(/(blured-input-text)/g, '')
    element.setAttribute('class', `${classes} focused-input-text`)
    // queueAttributes(element, [type, value])
  }
  children.forEach(child =>
    element.appendChild(isString(child) ? document.createTextNode(child) : child)
  )
  DOM.push(element)
  QUEUE_ARR.push(queue)
  queue = {}

  console.log(element)
  return element
}

export function render(view, actualState) {
  const root = document.getElementById('root')

  // const focusedElement = getFocusedElement(root)

  removeChildren(root)

  const actualView = view(actualState)
  DOM[0].setAttribute('id', QUEUE_ARR[3].id)
  root.appendChild(DOM[3])
  console.log(QUEUE_ARR)

  const focusedElement = document.querySelector('.focused-input-text')
  // resolveAttributesQueue()

  /* if (focusedElement) {
    focusedElement.focus()
  } */
}

export function setState(view, state, statePatch) {
  console.log(statePatch)
  Object.keys(statePatch).forEach(key => {
    state[key] = statePatch[key]
  })

  render(view, state)
}
