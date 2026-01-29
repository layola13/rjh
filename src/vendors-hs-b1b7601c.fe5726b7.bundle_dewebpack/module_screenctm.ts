function screenCTM(this: any): any {
  if (this instanceof n.Nested) {
    const rect = this.rect(1, 1);
    const ctm = rect.node.getScreenCTM();
    rect.remove();
    return new n.Matrix(ctm);
  }
  return new n.Matrix(this.node.getScreenCTM());
}