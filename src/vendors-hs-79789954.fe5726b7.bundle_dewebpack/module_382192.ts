type ScoreFunction<T> = (node: T) => number;

class BinaryHeap<T> {
  private content: T[];
  private scoreFunction: ScoreFunction<T>;

  constructor(scoreFunction: ScoreFunction<T>) {
    this.content = [];
    this.scoreFunction = scoreFunction;
  }

  push(element: T): void {
    this.content.push(element);
    this.bubbleUp(this.content.length - 1);
  }

  pop(): T {
    const result = this.content[0];
    const end = this.content.pop();
    
    if (this.content.length > 0 && end !== undefined) {
      this.content[0] = end;
      this.sinkDown(0);
    }
    
    return result;
  }

  peek(): T {
    return this.content[0];
  }

  remove(node: T): void {
    const length = this.content.length;
    
    for (let index = 0; index < length; index++) {
      if (this.content[index] === node) {
        const end = this.content.pop();
        
        if (index !== length - 1 && end !== undefined) {
          this.content[index] = end;
          
          if (this.scoreFunction(end) < this.scoreFunction(node)) {
            this.bubbleUp(index);
          } else {
            this.sinkDown(index);
          }
        }
        
        return;
      }
    }
    
    throw new Error("Node not found.");
  }

  size(): number {
    return this.content.length;
  }

  private bubbleUp(index: number): void {
    const element = this.content[index];
    
    while (index > 0) {
      const parentIndex = Math.floor((index + 1) / 2) - 1;
      const parent = this.content[parentIndex];
      
      if (this.scoreFunction(element) >= this.scoreFunction(parent)) {
        break;
      }
      
      this.content[parentIndex] = element;
      this.content[index] = parent;
      index = parentIndex;
    }
  }

  private sinkDown(index: number): void {
    const length = this.content.length;
    const element = this.content[index];
    const elementScore = this.scoreFunction(element);
    
    while (true) {
      const rightChildIndex = 2 * (index + 1);
      const leftChildIndex = rightChildIndex - 1;
      let swapIndex: number | null = null;
      let leftChildScore: number | undefined;
      
      if (leftChildIndex < length) {
        const leftChild = this.content[leftChildIndex];
        leftChildScore = this.scoreFunction(leftChild);
        
        if (leftChildScore < elementScore) {
          swapIndex = leftChildIndex;
        }
      }
      
      if (rightChildIndex < length) {
        const rightChild = this.content[rightChildIndex];
        const rightChildScore = this.scoreFunction(rightChild);
        
        if (rightChildScore < (swapIndex === null ? elementScore : leftChildScore!)) {
          swapIndex = rightChildIndex;
        }
      }
      
      if (swapIndex === null) {
        break;
      }
      
      this.content[index] = this.content[swapIndex];
      this.content[swapIndex] = element;
      index = swapIndex;
    }
  }
}

export default BinaryHeap;