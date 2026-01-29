function easeInSine(value: number): number {
  return 1 - Math.cos(value * Math.PI / 2);
}

export default easeInSine;