export function removeChildren(node) {
  while (node.hasChildNodes()) {
    node.removeChild(node.firstElementChild)
  }
}

export function queue() {}
