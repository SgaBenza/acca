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

  if (id) element.setAttribute('id', id)
  if (classes) element.setAttribute('class', classes.trim())

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
    element.focus()
  }

  children.forEach(child =>
    element.appendChild(isString(child) ? document.createTextNode(child) : child)
  )

  return element
}

export function render(view, actualState) {
  const root = document.getElementById('root')

  // const focusedElement = getFocusedElement()

  removeChildren(root)

  const actualView = view(actualState)
  root.appendChild(actualView)

  // if (focusedElement !== null) focusedElement.focus()
}

export function setState(view, state, actualState) {
  state.text = actualState.text

  render(view, actualState)
}
