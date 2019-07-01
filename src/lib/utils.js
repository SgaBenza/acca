export function setCaretPosition(element, start, end) {
  // IE >= 9 and other browsers
  if (element.setSelectionRange) {
    element.focus()
    element.setSelectionRange(start, end)
  }
  // IE < 9
  else if (element.createTextRange) {
    var range = element.createTextRange()
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
    var range = document.selection.createRange()
    var rangelen = range.text.length
    range.moveStart('character', -element.value.length)
    var start = range.text.length - rangelen
    return { start: start, end: start + rangelen }
  }
  // IE >=9 and other browsers
  else if (element.selectionStart || element.selectionStart == '0') {
    return { start: element.selectionStart, end: element.selectionEnd }
  } else {
    return { start: 0, end: 0 }
  }
}
