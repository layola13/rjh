function translateX(value?: number): this | number {
  if (value === null || value === undefined) {
    return this.transform("x");
  }
  
  return this.transform({
    x: value - this.x()
  }, true);
}