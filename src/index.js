const t = document.createTextNode('CIAO')

const a = document.createElement('span')
a.setAttribute('class', 'wer')
a.style.color = 'blue'
a.appendChild(t)

const e = document.createElement('div')
e.setAttribute('class', 'asd')
e.style.height = '50px'
e.style.background = 'steelblue'
e.appendChild(a)

document.body.appendChild(e)

// /////////////////////////////////////////////////////////////////////////////////////

// prettier-ignore
// const b = h('div', { class: 'asd', style: 'height: 50px; background: steelblue;' }, [
const b = h('div', { class: 'asd', style: { height: '50px', background: 'steelblue' } }, [
  h('span', { class: 'wer', style: 'color: blue;' }, [
    'CIAO',
  ]),
])

document.body.appendChild(b)

// /////////////////////////////////////////////////////////////////////////////////////

console.assert(e.isEqualNode(b), 'DIFFERENT!')

/*
1. v1
2. parsing classes and id in tagName
3. children destructuring and array of array
4. umbrella/hiccup syntax
*/

// /////////////////////////////////////////////////////////////////////////////////////

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

function h(tagName, attributes = {}, children = []) {
  const element = document.createElement(tagName || 'div')

  Object.entries(attributes).forEach(([key, value]) => {
    const attributeValue = isString(value) ? value : objectToStyleDeclaration(value)
    element.setAttribute(key, attributeValue)
  })

  children.forEach(child =>
    element.appendChild(isString(child) ? document.createTextNode(child) : child)
  )

  return element
}
