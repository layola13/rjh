function at<T>(this: { value: T; destination: T }, index: number): T {
  return index < 1 ? this.value : this.destination;
}