import createBaseFor from './createBaseFor';
import keysIn from './keysIn';
import isArrayLike from './isArrayLike';
import toKey from './toKey';

export default function valuesIn<T extends object>(object: T): Array<T[keyof T]> {
    return isArrayLike(object) ? createBaseFor(toKey(object)) : keysIn(object);
}