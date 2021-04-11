import * as React from "react";

export function getPosition(inputNode: HTMLElement, mountNode: HTMLElement) {
  const mountNodeRect = mountNode.getBoundingClientRect();
  const inputNodeRect = inputNode.getBoundingClientRect();

  const pos = {
    left: inputNodeRect.x - mountNodeRect.x,
    top: inputNodeRect.bottom - mountNodeRect.y,
    width: inputNodeRect.width,
  };

  const document = inputNode.ownerDocument;
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
  return child.type && !!child.type.isOption;
}

export function isInvalidChild(child: any) {
  return (
    typeof child === "undefined" || Array.isArray(child) || isOption(child)
  );
}

function toArray(children: React.ReactNode) {
  let ret: React.ReactNode[] = [];
  React.Children.forEach(children, (child) => {
    if (child === undefined || child === null) {
      return;
    }
    if (Array.isArray(child)) {
      ret = ret.concat(toArray(child));
    } else {
      ret.push(child);
    }
  });

  return ret;
}

export function convertChildrenToOption(nodes: React.ReactNode) {
  const nodesArray = toArray(nodes);

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

let uuid = 0;
export function getUUID() {
  return uuid++;
}
