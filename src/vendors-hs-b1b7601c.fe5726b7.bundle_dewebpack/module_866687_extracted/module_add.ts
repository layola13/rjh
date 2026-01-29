function add(element: Element, index?: number | null): Element {
  if (index == null) {
    this.node.appendChild(element.node);
  } else if (element.node !== this.node.childNodes[index]) {
    this.node.insertBefore(element.node, this.node.childNodes[index]);
  }
  
  return this;
}