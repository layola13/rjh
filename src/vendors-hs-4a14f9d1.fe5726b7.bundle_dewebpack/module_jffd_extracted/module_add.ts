function add<A>(item: A): void {
  const newNode = [item];
  
  if (this.h === null) {
    this.h = newNode;
  } else {
    this.q[1] = newNode;
  }
  
  this.q = newNode;
  this.length++;
}