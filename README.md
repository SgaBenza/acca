1. fake vdom
   state = { text: '', isFocused: false }
   view: state => DOMNode
   update: () => { DOM.replace(view(state)) } // Dove `DOM.replace` è da implementare per svuotare i child di body e ri-riempirli
   onClick/onInput: () => { state.text = 'asd'; update() }

   \*\* Add RESET Button
   \*\* TO FIX input caret position when insert string in the middle

2. make it a JS lib!
3. make children inside an array or not: h('div', {}, child1, child2, [child3, [child4, child5]])
4. make all parameters in h optional: distinguish based on whether they are a string / object / array.
5. make a <table> using h() with 100 rows and 4 columns, starting from a CSV (mockaroo.com)
6. hiccup syntax
   h(
   ['div', {},
   ['span', {},
   'Ciao!'
   ]
   ]
   )
