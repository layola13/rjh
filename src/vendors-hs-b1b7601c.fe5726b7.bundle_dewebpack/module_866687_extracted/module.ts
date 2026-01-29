function easeInOutCosine(value: number): number {
    return -Math.cos(value * Math.PI) / 2 + 0.5;
}