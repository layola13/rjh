function createIteratorResult<T>(index: number, array: T[]): IteratorResult<T> {
    return index >= array.length 
        ? { done: true, value: undefined }
        : { done: false, value: array[index++] };
}