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

let root = document.getElementById('root')

const update = () => event => {
  const { node, helloNode } = view(event.target.value)
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
      on: { input: update() },
    }),
    h('hr'),
    helloNode,
  ])
  return { node, helloNode }
}

root.appendChild(view('').node)

// /////////////////////////////////////////////////////////////////////////////////////

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

// prettier-ignore
// const b = h('div', { class: 'asd', style: 'height: 50px; background: steelblue;' }, [
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
