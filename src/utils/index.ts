import * as React from "react";

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

export function onResize(selector: Element | undefined, callback: () => void) {
  if (selector) {
    const mutationObserver = new MutationObserver(callback);
    mutationObserver.observe(selector, {
      attributes: true,
      attributeFilter: ["style"],
    });
  }
}

export function returnDocument(element?: HTMLElement | null) {
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

function isOption(child: any) {
  return child?.type && !!child.type.isOption;
}

export function isInvalidChild(child: any) {
  return (
    typeof child === "undefined" || Array.isArray(child) || isOption(child)
  );
}

export function convertChildrenToOption(nodes: React.ReactNode) {
  const nodesArray = React.Children.toArray(nodes);
  return nodesArray
    .map((node) => {
      if (!React.isValidElement(node) || !isOption(node)) {
        return null;
      }

      const {
        key,
        props: { children, value, ...restProps },
      } = node as React.ReactElement;

      return {
        key,
        value: value !== undefined ? value : key,
        children,
        ...restProps,
      };
    })
    .filter((data) => data);
}
