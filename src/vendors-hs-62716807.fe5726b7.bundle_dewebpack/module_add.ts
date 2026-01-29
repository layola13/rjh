interface QueueNode<T> {
  item: T;
  next: QueueNode<T> | null;
}

interface Queue<T> {
  head: QueueNode<T> | null;
  tail: QueueNode<T> | null;
}

function enqueue<T>(this: Queue<T>, element: T): void {
  const newNode: QueueNode<T> = {
    item: element,
    next: null
  };

  const currentTail = this.tail;
  
  if (currentTail) {
    currentTail.next = newNode;
  } else {
    this.head = newNode;
  }
  
  this.tail = newNode;
}