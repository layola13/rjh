function hasNext(this: { cur: number; arr: unknown[] }): boolean {
  return this.cur < this.arr.length;
}