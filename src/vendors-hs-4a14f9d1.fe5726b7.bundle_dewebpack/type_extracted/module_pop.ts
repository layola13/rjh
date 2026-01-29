function pop<T>(count?: number): T | T[] {
  if (count === undefined) {
    return this.stack[this.sp--];
  }
  
  const elements: T[] = [];
  for (let i = this.sp - count + 1; i <= this.sp; i++) {
    elements.push(this.stack[i]);
  }
  this.sp -= count;
  return elements;
}