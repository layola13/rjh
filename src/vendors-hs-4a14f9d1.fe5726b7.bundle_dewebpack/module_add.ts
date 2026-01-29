interface QueueNode<T> {
  0: T;
  1?: QueueNode<T>;
}

class Queue<T> {
  private head: QueueNode<T> | null = null;
  private tail: QueueNode<T> | null = null;
  public length: number = 0;

  add(item: T): void {
    const node: QueueNode<T> = [item];
    
    if (this.head === null) {
      this.head = node;
    } else if (this.tail !== null) {
      this.tail[1] = node;
    }
    
    this.tail = node;
    this.length++;
  }
}