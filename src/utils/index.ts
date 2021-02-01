export function getPosition(el: Element) {
  const rectObject = el.getBoundingClientRect();
  const pos = {
    left: rectObject.left,
    top: rectObject.top + rectObject.height,
    width: rectObject.width,
  };
  const document = el.ownerDocument;
  const window = document.defaultView;
  pos.left += window ? window.pageXOffset : 0;
  pos.top += window ? window.pageYOffset : 0;
  return pos;
}

export function contains(root: any, n: any) {
  let node = n;
  while (node) {
    if (node === root) {
      return true;
    }
    node = node.parentNode;
  }

  return false;
}
