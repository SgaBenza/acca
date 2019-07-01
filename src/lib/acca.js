import { removeChildren, setQueue, setQueueMultiple, pushElementDOM, getDOM } from './vdom'
import { setCaretPosition } from './utils'

// UTILS
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

// ACCA
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
    setQueue({ id: id })
  }
  if (classes) {
    setQueue({ classes: classes.trim() })
  }

  if (attributes.props) {
    let obj = []
    Object.entries(attributes.props).forEach(([key, value]) => {
      const attributeValue = isString(value) ? value : objectToStyleDeclaration(value)
      obj.push({
        attributes: [
          key,
          JSON.stringify(attributeValue)
            .replace(/\}|,/g, ';')
            .replace(/\{|"/g, ''),
        ],
      })
    })
    setQueueMultiple(obj)
  }

  if (attributes.on) {
    const entries = Object.entries(attributes.on)

    entries.forEach(([event, action]) => {
      setQueue({ listeners: [event, action] })
    })
  }

  // BUILD THE DOM
  children.forEach(child =>
    element.appendChild(isString(child) ? document.createTextNode(child) : child)
  )
  pushElementDOM(element)

  return element
}

// RENDER **********
export function render(view, actualState) {
  const root = document.getElementById('root')

  removeChildren(root)

  view(actualState)

  const tree = getDOM(actualState)

  root.appendChild(tree)
}

// SET STATE ******+ß
export function setState(view, state, statePatch, event) {
  Object.keys(statePatch).forEach(key => {
    state[key] = statePatch[key]
  })

  render(view, state)

  // MANAGE FOCUSED ACTIVE INPUT/TEXTAREA ELEMENT
  const tagName = event.target.tagName.toLowerCase()

  const startCaretPosition = event.target.value.length
  const endCaretPosition = startCaretPosition

  const activeElement = document.querySelector(`${tagName}[value='${event.target.value}']`)

  activeElement.focus()
  setCaretPosition(activeElement, startCaretPosition, endCaretPosition)
}
