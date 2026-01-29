export function findIndex<T>(array: T[], value: T, startIndex: number): number {
    const length = array.length;
    
    for (let index = startIndex - 1; ++index < length;) {
        if (array[index] === value) {
            return index;
        }
    }
    
    return -1;
}