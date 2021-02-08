import _reactDom from "react-dom";

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

export function onResize(selector: string, callback: () => void) {
  const observerNode = document.querySelector(selector);
  const mutationObserver = new MutationObserver(callback);
  if (observerNode) {
    mutationObserver.observe(observerNode, {
      attributes: true,
      attributeFilter: ["style"],
    });
  }
}

export function returnDocument(element?: HTMLElement) {
  if (element) {
    return element.ownerDocument;
  }
  return window.document;
}

export function contains(root: Node | null | undefined, n: Node | null) {
  if (!root) {
    return false;
  }
  return root.contains(n);
}
