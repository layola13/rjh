function translateX(value?: number): this | number {
  if (value == null) {
    return this.transform("x");
  }
  
  return this.transform({
    x: value - this.x()
  }, true);
}