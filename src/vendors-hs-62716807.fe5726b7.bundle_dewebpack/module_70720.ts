class Queue<T> {
  private head: QueueNode<T> | null = null;
  private tail: QueueNode<T> | null = null;

  /**
   * Adds an item to the end of the queue
   * @param item - The item to add to the queue
   */
  add(item: T): void {
    const node: QueueNode<T> = {
      item,
      next: null
    };

    const currentTail = this.tail;
    if (currentTail) {
      currentTail.next = node;
    } else {
      this.head = node;
    }
    this.tail = node;
  }

  /**
   * Removes and returns the item at the front of the queue
   * @returns The item at the front of the queue, or undefined if queue is empty
   */
  get(): T | undefined {
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
}

interface QueueNode<T> {
  item: T;
  next: QueueNode<T> | null;
}

export default Queue;