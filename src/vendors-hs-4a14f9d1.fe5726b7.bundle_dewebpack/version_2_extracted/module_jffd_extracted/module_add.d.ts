/**
 * Node in a linked list queue structure
 */
interface QueueNode<T> {
  0: T;
  1?: QueueNode<T>;
}

/**
 * Queue data structure with linked list implementation
 */
class Queue<T> {
  /** Head of the queue (first node) */
  private h: QueueNode<T> | null = null;
  
  /** Tail of the queue (last node) */
  private q: QueueNode<T> | null = null;
  
  /** Current length of the queue */
  public length: number = 0;

  /**
   * Adds an element to the end of the queue
   * @param element - The element to add to the queue
   */
  public add(element: T): void {
    const node: QueueNode<T> = [element];
    
    if (this.h === null) {
      this.h = node;
    } else {
      this.q![1] = node;
    }
    
    this.q = node;
    this.length++;
  }
}