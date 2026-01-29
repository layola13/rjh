function get<T>(this: { head: Node<T> | null; tail: Node<T> | null }): T | undefined {
  const currentHead = this.head;
  
  if (!currentHead) {
    return undefined;
  }
  
  this.head = currentHead.next;
  
  if (this.head === null) {
    this.tail = null;
  }
  
  return currentHead.item;
}

interface Node<T> {
  item: T;
  next: Node<T> | null;
}