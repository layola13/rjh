function width(value?: number | null): number {
  if (value === null || value === undefined) {
    return 2 * this.rx();
  }
  
  return this.rx(new SVGNumber(value).divide(2));
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