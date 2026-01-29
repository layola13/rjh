function leading(value?: number | null): number | this {
  if (value === null || value === undefined) {
    return this.dom.leading;
  }
  
  this.dom.leading = new n.Number(value);
  return this.rebuild();
}