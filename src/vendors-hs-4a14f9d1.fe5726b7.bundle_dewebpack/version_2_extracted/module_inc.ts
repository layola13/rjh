function increment(this: { mult: number }): void {
  this.mult++;
}