type Comparator<T> = (a: T, b: T) => number;

class PriorityQueue<T = number | string> {
  private _comparator: Comparator<T>;
  private _elements: T[];

  constructor(comparator?: Comparator<T>) {
    this._comparator = comparator || PriorityQueue.DEFAULT_COMPARATOR;
    this._elements = [];
  }

  static DEFAULT_COMPARATOR<T>(a: T, b: T): number {
    if (typeof a === "number" && typeof b === "number") {
      return a - b;
    }
    const aStr = a.toString();
    const bStr = b.toString();
    if (aStr === bStr) return 0;
    return aStr > bStr ? 1 : -1;
  }

  isEmpty(): boolean {
    return this.size() === 0;
  }

  peek(): T {
    if (this.isEmpty()) {
      throw new Error("PriorityQueue is empty");
    }
    return this._elements[0];
  }

  deq(): T {
    const topElement = this.peek();
    const lastElement = this._elements.pop()!;
    const currentSize = this.size();
    
    if (currentSize === 0) {
      return topElement;
    }
    
    this._elements[0] = lastElement;
    
    let currentIndex = 0;
    while (currentIndex < currentSize) {
      let largestIndex = currentIndex;
      const leftChildIndex = 2 * currentIndex + 1;
      const rightChildIndex = 2 * currentIndex + 2;
      
      if (leftChildIndex < currentSize && this._compare(leftChildIndex, largestIndex) >= 0) {
        largestIndex = leftChildIndex;
      }
      
      if (rightChildIndex < currentSize && this._compare(rightChildIndex, largestIndex) >= 0) {
        largestIndex = rightChildIndex;
      }
      
      if (largestIndex === currentIndex) {
        break;
      }
      
      this._swap(largestIndex, currentIndex);
      currentIndex = largestIndex;
    }
    
    return topElement;
  }

  enq(element: T): number {
    const newSize = this._elements.push(element);
    let currentIndex = newSize - 1;
    
    while (currentIndex > 0) {
      const parentIndex = Math.floor((currentIndex - 1) / 2);
      
      if (this._compare(currentIndex, parentIndex) <= 0) {
        break;
      }
      
      this._swap(parentIndex, currentIndex);
      currentIndex = parentIndex;
    }
    
    return newSize;
  }

  size(): number {
    return this._elements.length;
  }

  forEach(callback: (element: T, index: number, array: T[]) => void): void {
    this._elements.forEach(callback);
  }

  private _compare(indexA: number, indexB: number): number {
    return this._comparator(this._elements[indexA], this._elements[indexB]);
  }

  private _swap(indexA: number, indexB: number): void {
    const temp = this._elements[indexA];
    this._elements[indexA] = this._elements[indexB];
    this._elements[indexB] = temp;
  }
}

export default PriorityQueue;