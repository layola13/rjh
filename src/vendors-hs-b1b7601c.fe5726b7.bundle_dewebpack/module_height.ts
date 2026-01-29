function height(value?: number | null): number {
  if (value == null) {
    return 2 * this.ry();
  }
  
  return this.ry(new n.Number(value).divide(2));
}