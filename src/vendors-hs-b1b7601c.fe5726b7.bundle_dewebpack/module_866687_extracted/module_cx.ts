function cx(e?: number): number | this {
  return e == null ? this.gbox().cx : this.x(e - this.gbox().width / 2);
}