function cx(e: number | null): number | this {
  return null == e ? this.gbox().cx : this.x(e - this.gbox().width / 2);
}