export function isEqualArrays<T>(firstArray: T[] | null | undefined, secondArray: T[] | null | undefined): boolean {
    if (firstArray === secondArray) return true;
    if (!firstArray || !secondArray) return false;
    
    const length = firstArray.length;
    if (secondArray.length !== length) return false;
    
    for (let index = 0; index < length; index++) {
        if (firstArray[index] !== secondArray[index]) return false;
    }
    
    return true;
}