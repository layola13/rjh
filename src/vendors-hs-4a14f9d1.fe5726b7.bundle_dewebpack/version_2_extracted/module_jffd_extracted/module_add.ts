function add<T>(item: T): void {
  const newNode: [T] = [item];
  
  if (this.h === null) {
    this.h = newNode;
  } else {
    this.q[1] = newNode;
  }
  
  this.q = newNode;
  this.length++;
}