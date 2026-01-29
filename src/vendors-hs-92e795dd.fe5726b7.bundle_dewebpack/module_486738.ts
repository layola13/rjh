export class Heap<T> {
  private _node: T[] = [];
  private _cmp: (a: T, b: T) => number;

  constructor(compareFn?: (a: T, b: T) => number) {
    this._cmp = compareFn ?? ((a: T, b: T) => {
      if (a < b) return -1;
      if (a === b) return 0;
      return 1;
    });
  }

  get length(): number {
    return this._node.length;
  }

  get top(): T {
    return this._node[0];
  }

  push(value: T): number {
    this._node.push(value);
    this._botUpdate(this._node.length - 1);
    return this._node.length;
  }

  pop(): T {
    const topValue = this._node[0];
    
    if (this._node.length > 1) {
      this._node[0] = this._node.pop()!;
      this._topUpdate();
    } else {
      this._node.pop();
    }
    
    return topValue;
  }

  private _check(childIndex: number, parentIndex: number): boolean {
    return (
      childIndex >= this._node.length ||
      this._cmp(this._node[parentIndex], this._node[childIndex]) <= 0
    );
  }

  private _swap(indexA: number, indexB: number): void {
    [this._node[indexA], this._node[indexB]] = [this._node[indexB], this._node[indexA]];
    
    if (indexA > indexB) {
      this._botUpdate(indexB);
    } else {
      this._topUpdate(indexB);
    }
  }

  private _botUpdate(index: number): void {
    if (!index) return;
    
    const parentIndex = (index - 1) >> 1;
    
    if (!this._check(index, parentIndex)) {
      this._swap(index, parentIndex);
      this._botUpdate(parentIndex);
    }
  }

  private _topUpdate(index: number = 0): void {
    const leftChildIndex = 1 + (index << 1);
    const rightChildIndex = 2 + (index << 1);
    
    const rightIsValid = this._check(rightChildIndex, leftChildIndex);
    
    if (rightIsValid) {
      if (!this._check(leftChildIndex, index)) {
        this._swap(index, leftChildIndex);
      }
    } else {
      if (!this._check(rightChildIndex, index)) {
        this._swap(index, rightChildIndex);
      }
    }
  }
}