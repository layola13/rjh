function width(value?: number | null): number {
  if (value == null) {
    return 2 * this.rx();
  }
  
  return this.rx(new SVGNumber(value).divide(2));
}

interface SVGNumber {
  divide(divisor: number): number;
}