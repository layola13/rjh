function height(value?: number | null): number | this {
  return value == null 
    ? 2 * this.ry() 
    : this.ry(new SVGNumber(value).divide(2));
}

class SVGNumber {
  private value: number;

  constructor(value: number) {
    this.value = value;
  }

  divide(divisor: number): number {
    return this.value / divisor;
  }
}

interface EllipseElement {
  ry(): number;
  ry(value: number): this;
  height(value?: number | null): number | this;
}