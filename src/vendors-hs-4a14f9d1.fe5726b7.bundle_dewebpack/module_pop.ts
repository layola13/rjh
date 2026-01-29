function pop<T>(this: { h: [T, any] | null; q: any | null; length: number }): T | null {
  if (this.h === null) {
    return null;
  }
  
  const item = this.h[0];
  this.h = this.h[1];
  
  if (this.h === null) {
    this.q = null;
  }
  
  this.length--;
  
  return item;
}