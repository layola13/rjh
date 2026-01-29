interface PriorityQueueItem {
  key: string;
  priority: number;
}

interface KeyIndices {
  [key: string]: number;
}

class PriorityQueue {
  private _arr: PriorityQueueItem[];
  private _keyIndices: KeyIndices;

  constructor() {
    this._arr = [];
    this._keyIndices = {};
  }

  /**
   * Returns the number of items in the queue
   */
  size(): number {
    return this._arr.length;
  }

  /**
   * Returns all keys in the queue
   */
  keys(): string[] {
    return this._arr.map((item) => item.key);
  }

  /**
   * Checks if a key exists in the queue
   */
  has(key: string): boolean {
    return Object.prototype.hasOwnProperty.call(this._keyIndices, key);
  }

  /**
   * Returns the priority of a given key
   */
  priority(key: string): number | undefined {
    const index = this._keyIndices[key];
    if (index !== undefined) {
      return this._arr[index].priority;
    }
    return undefined;
  }

  /**
   * Returns the key with minimum priority
   */
  min(): string {
    if (this.size() === 0) {
      throw new Error("Queue underflow");
    }
    return this._arr[0].key;
  }

  /**
   * Adds a key with the given priority to the queue
   */
  add(key: string, priority: number): boolean {
    const normalizedKey = String(key);
    
    if (!this.has(normalizedKey)) {
      const currentLength = this._arr.length;
      this._keyIndices[normalizedKey] = currentLength;
      this._arr.push({
        key: normalizedKey,
        priority: priority
      });
      this._decrease(currentLength);
      return true;
    }
    
    return false;
  }

  /**
   * Removes and returns the key with minimum priority
   */
  removeMin(): string {
    this._swap(0, this._arr.length - 1);
    const removedItem = this._arr.pop()!;
    delete this._keyIndices[removedItem.key];
    this._heapify(0);
    return removedItem.key;
  }

  /**
   * Decreases the priority of a key
   */
  decrease(key: string, newPriority: number): void {
    const index = this._keyIndices[key];
    const currentPriority = this._arr[index].priority;
    
    if (newPriority > currentPriority) {
      throw new Error(
        `New priority is greater than current priority. Key: ${key} Old: ${currentPriority} New: ${newPriority}`
      );
    }
    
    this._arr[index].priority = newPriority;
    this._decrease(index);
  }

  /**
   * Maintains heap property by moving element down
   */
  private _heapify(index: number): void {
    const arr = this._arr;
    const leftChild = 2 * index;
    const rightChild = leftChild + 1;
    let smallest = index;

    if (leftChild < arr.length) {
      smallest = arr[leftChild].priority < arr[smallest].priority ? leftChild : smallest;
      
      if (rightChild < arr.length) {
        smallest = arr[rightChild].priority < arr[smallest].priority ? rightChild : smallest;
      }
      
      if (smallest !== index) {
        this._swap(index, smallest);
        this._heapify(smallest);
      }
    }
  }

  /**
   * Maintains heap property by moving element up
   */
  private _decrease(index: number): void {
    const arr = this._arr;
    const priority = arr[index].priority;
    let currentIndex = index;

    while (currentIndex !== 0) {
      const parentIndex = currentIndex >> 1;
      
      if (arr[parentIndex].priority < priority) {
        break;
      }
      
      this._swap(currentIndex, parentIndex);
      currentIndex = parentIndex;
    }
  }

  /**
   * Swaps two elements in the heap
   */
  private _swap(indexA: number, indexB: number): void {
    const arr = this._arr;
    const indices = this._keyIndices;
    const itemA = arr[indexA];
    const itemB = arr[indexB];

    arr[indexA] = itemB;
    arr[indexB] = itemA;
    indices[itemB.key] = indexA;
    indices[itemA.key] = indexB;
  }
}

export default PriorityQueue;