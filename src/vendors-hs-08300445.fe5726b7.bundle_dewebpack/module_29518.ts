type PlainObject = Record<string, unknown>;

/**
 * Checks if a value is a plain object (created by Object literal or Object.create(null))
 * @param value - The value to check
 * @returns True if the value is a plain object, false otherwise
 */
export default function isPlainObject(value: unknown): value is PlainObject {
    if (typeof value !== "object" || value === null) {
        return false;
    }
    
    const prototype = Object.getPrototypeOf(value);
    
    if (prototype === null) {
        return true;
    }
    
    let basePrototype = prototype;
    while (Object.getPrototypeOf(basePrototype) !== null) {
        basePrototype = Object.getPrototypeOf(basePrototype);
    }
    
    return prototype === basePrototype;
}