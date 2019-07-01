export function setCaretPosition(element, start, end) {
  // IE >= 9 and other browsers
  if (element.setSelectionRange) {
    element.focus()
    element.setSelectionRange(start, end)
  } else if (element.createTextRange) {
    // IE < 9
    const range = element.createTextRange()

    range.collapse(true)
    range.moveEnd('character', end)
    range.moveStart('character', start)
    range.select()
  }
}

export function getCaretPosition(element) {
  // IE < 9 Support
  if (document.selection) {
    element.focus()

    const range = document.selection.createRange()
    const rangelen = range.text.length
    const start = range.text.length - rangelen

    range.moveStart('character', -element.value.length)

    return { start: start, end: start + rangelen }
  } else if (element.selectionStart || element.selectionStart === '0') {
    // IE >=9 and other browsers
    return { start: element.selectionStart, end: element.selectionEnd }
  } else {
    return { start: 0, end: 0 }
  }
}
