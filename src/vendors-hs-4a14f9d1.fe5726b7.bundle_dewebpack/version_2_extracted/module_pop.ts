function pop<T>(this: { h: [T, any] | null; q: any; length: number }): T | null {
  if (this.h === null) return null;
  
  const value = this.h[0];
  this.h = this.h[1];
  
  if (this.h === null) {
    this.q = null;
  }
  
  this.length--;
  
  return value;
}