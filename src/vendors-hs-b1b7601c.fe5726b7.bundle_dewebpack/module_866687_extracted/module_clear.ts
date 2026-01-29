function clear(this: { node: Node; _defs?: unknown }): typeof this {
  while (this.node.hasChildNodes()) {
    this.node.removeChild(this.node.lastChild!);
  }
  delete this._defs;
  return this;
}