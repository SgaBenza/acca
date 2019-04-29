const t = document.createTextNode('CIAO')

const a = document.createElement('span')
a.setAttribute('class', 'wer')
a.style.color = 'blue'
a.appendChild(t)

const e = document.createElement('div')
e.setAttribute('class', 'asd qwerty')
e.style.height = '50px'
e.style.background = 'steelblue'
e.appendChild(a)

// document.body.appendChild(e)

// /////////////////////////////////////////////////////////////////////////////////////

// prettier-ignore
// const b = h('div', { class: 'asd', style: 'height: 50px; background: steelblue;' }, [
const update = () => console.log('ACTION!')
const b = h(
  'div.asd.qwerty',
  {
    props: { style: { height: '50px', background: 'steelblue' } },
    on: { click: update },
  },
  [
    h(
      'span',
      {
        props: { class: 'wer', style: 'color: blue;' },
      },
      ['CLICK ME']
    ),
  ]
)

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

  children.forEach(child =>
    element.appendChild(isString(child) ? document.createTextNode(child) : child)
  )

  return element
}
