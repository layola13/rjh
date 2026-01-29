function next<T>(this: { arr: T[]; cur: number }): T {
  return this.arr[this.cur++];
}