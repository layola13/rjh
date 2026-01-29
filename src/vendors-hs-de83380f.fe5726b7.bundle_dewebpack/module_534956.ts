/**
 * Converts an iterable value to an array.
 * Attempts multiple conversion strategies for different iterable types.
 * 
 * @template T - The type of elements in the iterable
 * @param value - The value to convert to an array
 * @returns An array containing the elements from the iterable
 * @throws When the value cannot be converted to an array
 */
export default function toArray<T>(value: Iterable<T> | ArrayLike<T>): T[] {
    return (
        arrayLikeToArray(value) ||
        iterableToArray(value) ||
        unsupportedIterableToArray(value) ||
        nonIterableSpread()
    );
}

/**
 * Converts an array-like object to a native array using Array.from or similar methods.
 */
function arrayLikeToArray<T>(value: Iterable<T> | ArrayLike<T>): T[] | null {
    if (Array.isArray(value)) {
        return value;
    }
    return null;
}

/**
 * Converts an iterable (like Set, Map, etc.) to an array using spread or Array.from.
 */
function iterableToArray<T>(value: Iterable<T> | ArrayLike<T>): T[] | null {
    if (typeof Symbol !== 'undefined' && value != null && Symbol.iterator in Object(value)) {
        return Array.from(value as Iterable<T>);
    }
    return null;
}

/**
 * Handles conversion of unsupported or special iterable types.
 */
function unsupportedIterableToArray<T>(value: Iterable<T> | ArrayLike<T>): T[] | null {
    if (value) {
        if (typeof value === 'string') {
            return Array.from(value) as unknown as T[];
        }
        const className = Object.prototype.toString.call(value).slice(8, -1);
        if (className === 'Object' && value.constructor) {
            return Array.from(value as ArrayLike<T>);
        }
        if (/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(className)) {
            return Array.from(value as ArrayLike<T>);
        }
    }
    return null;
}

/**
 * Throws an error when attempting to spread a non-iterable value.
 * @throws Always throws a TypeError
 */
function nonIterableSpread(): never {
    throw new TypeError(
        'Invalid attempt to spread non-iterable instance.\n' +
        'In order to be iterable, non-array objects must have a [Symbol.iterator]() method.'
    );
}