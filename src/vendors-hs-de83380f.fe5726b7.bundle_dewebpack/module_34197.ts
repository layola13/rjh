/**
 * Converts an iterable value to an array.
 * @template T - The type of elements in the iterable
 * @param value - The value to convert to an array
 * @returns An array containing all elements from the iterable
 * @throws {TypeError} If the value is not iterable
 */
export default function toConsumableArray<T>(value: Iterable<T> | ArrayLike<T>): T[] {
    if (Array.isArray(value)) {
        return [...value];
    }
    
    if (typeof value === 'string' || Symbol.iterator in Object(value)) {
        return Array.from(value as Iterable<T>);
    }
    
    if (value != null && typeof (value as ArrayLike<T>).length === 'number') {
        return Array.from(value as ArrayLike<T>);
    }
    
    throw new TypeError(
        "Invalid attempt to spread non-iterable instance.\n" +
        "In order to be iterable, non-array objects must have a [Symbol.iterator]() method."
    );
}