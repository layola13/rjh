function add<A>(element: A): void {
  const newNode: [A] = [element];
  
  if (this.h === null) {
    this.h = newNode;
  } else {
    this.q[1] = newNode;
  }
  
  this.q = newNode;
  this.length++;
}