function toPixels(element: HTMLElement): number {
  if (!a.hasValue()) return 0;

  const valueString: string = a.value + "";

  if (valueString.match(/em$/)) {
    return a.numValue() * this.EM(element);
  }

  if (valueString.match(/ex$/)) {
    return a.numValue() * this.EM(element) / 2;
  }

  if (valueString.match(/px$/)) {
    return a.numValue();
  }

  if (valueString.match(/pt$/)) {
    return 1.25 * a.numValue();
  }

  if (valueString.match(/pc$/)) {
    return 15 * a.numValue();
  }

  if (valueString.match(/cm$/)) {
    return a.numValue() * this.DPI(element) / 2.54;
  }

  if (valueString.match(/mm$/)) {
    return a.numValue() * this.DPI(element) / 25.4;
  }

  if (valueString.match(/in$/)) {
    return a.numValue() * this.DPI(element);
  }

  if (valueString.match(/%$/)) {
    return a.numValue() * t.ViewPort.ComputeSize(element);
  }

  return a.numValue();
}