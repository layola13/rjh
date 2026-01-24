/**
 * 数组迭代器实现
 * 提供对数组元素的顺序访问
 * @template T 数组元素的类型
 */
class ArrayIterator<T> implements Iterator<T> {
  private currentIndex: number = 0;
  
  constructor(private readonly elements: readonly T[]) {}
  
  /**
   * 获取迭代器的下一个元素
   * @returns 迭代器结果，包含值和完成状态
   */
  next(): IteratorResult<T> {
    if (this.currentIndex >= this.elements.length) {
      return {
        done: true,
        value: undefined
      };
    }
    
    return {
      done: false,
      value: this.elements[this.currentIndex++]
    };
  }
}

export { ArrayIterator };