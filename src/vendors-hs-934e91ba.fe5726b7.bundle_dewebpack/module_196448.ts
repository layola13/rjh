import isPrototype from './isPrototype';
import nativeKeys from './nativeKeys';

/**
 * Creates an array of the own enumerable property names of object.
 * 
 * @param obj - The object to query
 * @returns Returns the array of property names
 */
export default function baseKeys(obj: unknown): string[] {
    if (!isPlainObject(obj)) {
        return nativeKeys(obj);
    }
    
    const isProto = isPrototype(obj);
    const result: string[] = [];
    
    for (const key in obj) {
        if (key !== 'constructor' || (!isProto && Object.prototype.hasOwnProperty.call(obj, key))) {
            result.push(key);
        }
    }
    
    return result;
}

/**
 * Checks if value is a plain object.
 */
function isPlainObject(value: unknown): value is Record<string, unknown> {
    return value != null && typeof value === 'object';
}