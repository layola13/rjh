function getFirstElementChild(this: { domDocument: Document }): Element | undefined {
  if (!this.domDocument.hasChildNodes()) {
    return undefined;
  }

  const childNodes = this.domDocument.childNodes;
  const ELEMENT_NODE = 1;

  for (let i = 0; i < childNodes.length; i++) {
    const node = childNodes[i];
    if (node.nodeType === ELEMENT_NODE) {
      return node as Element;
    }
  }

  return undefined;
}