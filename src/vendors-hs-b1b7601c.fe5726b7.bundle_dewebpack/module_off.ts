interface EventTarget {
  off(node: Node, event: string, handler: Function): void;
}

function off(event: string, handler: Function): any {
  return n.off(this.node, event, handler), this;
}