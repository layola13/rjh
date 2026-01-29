function removeElement(element: { node: Node }): { node: Node } {
  this.node.removeChild(element.node);
  return this;
}