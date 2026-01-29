function queryChildren(parent: Element, selector: string): Element[] {
  return Array.prototype.filter.call(
    parent.childNodes,
    (node: Node): node is Element => {
      return node instanceof Element && node.matches(selector);
    }
  );
}

export { queryChildren };